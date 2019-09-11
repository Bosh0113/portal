package njgis.opengms.portal.service;

import com.alibaba.fastjson.JSONObject;
import njgis.opengms.portal.dao.EducationExperienceDao;
import njgis.opengms.portal.dao.UserDao;
import njgis.opengms.portal.dto.educationExperience.EducationExperienceFindDTO;
import njgis.opengms.portal.dto.educationExperience.EducationExperienceResultDTO;
import njgis.opengms.portal.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class EducationExperienceService {
    @Autowired
    EducationExperienceDao educationExperienceDao;
    @Autowired
    UserDao userDao;
    @Autowired
    UserService userService;

    public JSONObject getByUserOidBySort(EducationExperienceFindDTO educationExperienceFindDTO , String userName ){
        int page=educationExperienceFindDTO.getPage();
        int pageSize = educationExperienceFindDTO.getPageSize();
        String sortElement=educationExperienceFindDTO.getSortElement();
        Boolean asc = educationExperienceFindDTO.getAsc();


//        根据创建时间排序
        Sort sort=new Sort(asc?Sort.Direction.ASC : Sort.Direction.DESC, sortElement);
        Pageable pageable= PageRequest.of(page,pageSize,sort);
        Page<EducationExperienceResultDTO> educationExperienceResultDTOPage=educationExperienceDao.findByContributor(userName,pageable);
        JSONObject result=new JSONObject();
        result.put("list",educationExperienceResultDTOPage.getContent());
        result.put("total", educationExperienceResultDTOPage.getTotalElements());

        System.out.println(result);
        return result;

    }

    public JSONObject listByUserOid(EducationExperienceFindDTO educationExperienceFindDTO, String oid ){
        int page=educationExperienceFindDTO.getPage();
        int pageSize = educationExperienceFindDTO.getPageSize();
        Boolean asc = educationExperienceFindDTO.getAsc();

//        根据访问数量排序
        Sort sort=new Sort(asc?Sort.Direction.ASC : Sort.Direction.DESC, "awardTime");
        Pageable pageable= PageRequest.of(page,pageSize,sort);
        User user=userDao.findFirstByOid(oid);
        Page<EducationExperienceResultDTO> educationExperienceResultDTOPage=educationExperienceDao.findByContributor(user.getUserName(),pageable);

        JSONObject result=new JSONObject();
        result.put("list",educationExperienceResultDTOPage.getContent());
        result.put("total",educationExperienceResultDTOPage.getTotalElements());

        return result;
    }
}