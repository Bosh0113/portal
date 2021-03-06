package njgis.opengms.portal.controller.rest;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import njgis.opengms.portal.bean.JsonResult;
import njgis.opengms.portal.dto.LogicalModel.LogicalModelFindDTO;
import njgis.opengms.portal.dto.LogicalModel.LogicalModelResultDTO;
import njgis.opengms.portal.dto.modelItem.ModelItemFindDTO;
import njgis.opengms.portal.entity.LogicalModel;
import njgis.opengms.portal.entity.ModelItem;
import njgis.opengms.portal.entity.User;
import njgis.opengms.portal.service.ItemService;
import njgis.opengms.portal.service.LogicalModelService;
import njgis.opengms.portal.service.ModelItemService;
import njgis.opengms.portal.service.UserService;
import njgis.opengms.portal.utils.ResultUtils;
import njgis.opengms.portal.utils.Utils;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.text.ParseException;
import java.util.List;

/**
 * @ClassName ModelItemRestController
 * @Description todo
 * @Author Kai
 * @Date 2019/2/21
 * @Version 1.0.0
 * TODO
 */
@RestController
@RequestMapping(value = "/logicalModel")
public class LogicalModelRestController {

    @Autowired
    ItemService itemService;

    @Autowired
    LogicalModelService logicalModelService;

    @Autowired
    ModelItemService modelItemService;

    @Autowired
    UserService userService;

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @RequestMapping(value="/repository",method = RequestMethod.GET)
    public ModelAndView getModelItems() {
        System.out.println("logical model");

        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("logical_models");

        return modelAndView;
    }

    @RequestMapping (value="/{id}",method = RequestMethod.GET)
    ModelAndView get(@PathVariable ("id") String id ,HttpServletRequest request){
        return logicalModelService.getPage(id,request);
    }

    @RequestMapping (value="/getInfo/{id}",method = RequestMethod.GET)
    JsonResult getInfo(@PathVariable ("id") String id){

        LogicalModel logicalModel=logicalModelService.getByOid(id);
        ModelItem modelItem=modelItemService.getByOid(logicalModel.getRelateModelItem());
        LogicalModelResultDTO logicalModelResultDTO=new LogicalModelResultDTO();
        BeanUtils.copyProperties(logicalModel,logicalModelResultDTO);
        logicalModelResultDTO.setRelateModelItemName(modelItem.getName());
        //资源信息
        JSONArray resourceArray = new JSONArray();
        List<String> resources = logicalModel.getImage();

        if (resources != null) {
            for (int i = 0; i < resources.size(); i++) {

                String path = resources.get(i);

                String[] arr = path.split("\\.");
                String suffix = arr[arr.length - 1];

                arr = path.split("/");
                String name = arr[arr.length - 1].substring(14);

                JSONObject jsonObject = new JSONObject();
                jsonObject.put("name", name);
                jsonObject.put("suffix", suffix);
                jsonObject.put("path", resources.get(i));
                resourceArray.add(jsonObject);
            }
        }
        logicalModelResultDTO.setResourceJson(resourceArray);

        return ResultUtils.success(logicalModelResultDTO);
    }

    @RequestMapping (value = "/listByUserOid",method = RequestMethod.GET)
    JsonResult listByUserOid(ModelItemFindDTO modelItemFindDTO,@RequestParam(value="oid") String oid,HttpServletRequest request){
        HttpSession session = request.getSession();
        String loadUser = null;
        if(session.getAttribute("oid")!=null)
            loadUser =  session.getAttribute("oid").toString() ;
        return ResultUtils.success(logicalModelService.listByUserOid(modelItemFindDTO,oid,loadUser));
    }

    @RequestMapping (value="/list",method = RequestMethod.POST)
    JsonResult list(ModelItemFindDTO modelItemFindDTO,@RequestParam(value="classifications[]") List<String> classes){
        return ResultUtils.success(logicalModelService.list(modelItemFindDTO,classes));
    }

    @RequestMapping (value="/listByAuthor",method = RequestMethod.POST)
    JsonResult listByAuthor(ModelItemFindDTO modelItemFindDTO,
                            @RequestParam(value="classifications[]") List<String> classes,
                            HttpServletRequest request){
        HttpSession session = request.getSession();
        if(Utils.checkLoginStatus(session)==null){
            return ResultUtils.error(-1,"no login");
        }else{
            String userName = session.getAttribute("uid").toString();
            return ResultUtils.success(logicalModelService.listByAuthor(modelItemFindDTO,userName,classes));
        }

    }

    @RequestMapping (value="/advance",method = RequestMethod.POST)
    JsonResult advanced(ModelItemFindDTO modelItemFindDTO,
                        @RequestParam(value="classifications[]") List<String> classes,
                        @RequestParam(value="connects[]") List<String> connects,
                        @RequestParam(value="props[]") List<String> props,
                        @RequestParam(value="values[]") List<String> values){
        try {
            return ResultUtils.success(logicalModelService.query(modelItemFindDTO, connects, props, values, classes));
        }catch (ParseException e){
            return new JsonResult();
        }
    }

    @RequestMapping (value="/getLogicalModelsByUserId",method = RequestMethod.GET)
    public JsonResult getLogicalModelsByUserId(HttpServletRequest request,
                                        @RequestParam(value="page") int page,
                                        @RequestParam(value="sortType") String sortType,
                                        @RequestParam(value="asc") int sortAsc){

        HttpSession session=request.getSession();
        if(session.getAttribute("uid")==null){
            return ResultUtils.error(-1,"no login");
        }
        String uid=session.getAttribute("uid").toString();

        JSONObject result=logicalModelService.getLogicalModelsByUserId(uid,page,sortType,sortAsc);

        return ResultUtils.success(result);
    }

    @RequestMapping (value="/searchLogicalModelsByUserId",method = RequestMethod.GET)
    public JsonResult searchLogicalModelsByUserId(HttpServletRequest request,
                                               @RequestParam(value="searchText") String searchText,
                                               @RequestParam(value="page") int page,
                                               @RequestParam(value="sortType") String sortType,
                                               @RequestParam(value="asc") int sortAsc){

        HttpSession session=request.getSession();
        if(session.getAttribute("uid")==null){
            return ResultUtils.error(-1,"no login");
        }
        String uid=session.getAttribute("uid").toString();

        JSONObject result=logicalModelService.searchLogicalModelsByUserId(searchText.trim(),uid,page,sortType,sortAsc);

        return ResultUtils.success(result);
    }

    @RequestMapping(value="/searchByNameByOid",method= RequestMethod.GET)
    JsonResult searchByTitle(LogicalModelFindDTO logicalModelFindDTO, String oid,HttpServletRequest request){
        HttpSession session = request.getSession();
        String loadUser = null;
        if(session.getAttribute("oid")!=null)
            loadUser =  session.getAttribute("oid").toString() ;
        return ResultUtils.success(logicalModelService.searchByTitleByOid(logicalModelFindDTO,oid,loadUser));
    }

    @RequestMapping (value="/add",method = RequestMethod.POST)
    JsonResult add( HttpServletRequest request) throws IOException {

        MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
        List<MultipartFile> files=multipartRequest.getFiles("imgFiles");
        MultipartFile file=multipartRequest.getFile("logicalModel");
        String model=IOUtils.toString(file.getInputStream(),"utf-8");

        JSONObject jsonObject=JSONObject.parseObject(model);
        logger.info(jsonObject.toJSONString());

        HttpSession session=request.getSession();
        String uid=session.getAttribute("uid").toString();
        if(uid==null)
        {
            return ResultUtils.error(-2,"未登录");
        }
        JSONObject result=logicalModelService.insert(files,jsonObject,uid);
        userService.logicalModelPlusPlus(uid);

        return ResultUtils.success(result);
    }

    @RequestMapping (value="/update",method = RequestMethod.POST)
    JsonResult update( HttpServletRequest request) throws IOException {

        MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
        List<MultipartFile> files=multipartRequest.getFiles("imgFiles");
        MultipartFile file=multipartRequest.getFile("logicalModel");
        String model=IOUtils.toString(file.getInputStream(),"utf-8");
        JSONObject jsonObject=JSONObject.parseObject(model);

        HttpSession session=request.getSession();
        String uid=session.getAttribute("uid").toString();
        if(uid==null)
        {
            return ResultUtils.error(-2,"未登录");
        }
        JSONObject result=logicalModelService.update(files,jsonObject,uid);

        if(result==null){
            return ResultUtils.error(-1,"There is another version have not been checked, please contact opengms@njnu.edu.cn if you want to modify this item.");
        }
        else {
            return ResultUtils.success(result);
        }
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public JsonResult deleteLogicalModel(@RequestParam(value="oid") String oid, HttpServletRequest request){
        HttpSession session=request.getSession();

        if(session.getAttribute("uid")==null){
            return ResultUtils.error(-1,"no login");
        }
        String userName=session.getAttribute("uid").toString();
        return ResultUtils.success(logicalModelService.delete(oid,userName));
    }

    @RequestMapping (value = "/getUserOidByOid", method = RequestMethod.GET)
    public JsonResult getUserOidByOid(@RequestParam(value="oid") String oid){
        LogicalModel logicalModel=logicalModelService.getByOid(oid);
        String userId=logicalModel.getAuthor();
        User user=userService.getByUid(userId);
        return ResultUtils.success(user.getOid());

    }

}
