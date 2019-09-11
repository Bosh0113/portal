package njgis.opengms.portal.service;

import com.alibaba.fastjson.JSONObject;
import njgis.opengms.portal.dao.ConferenceDao;
import njgis.opengms.portal.dao.UserDao;
import njgis.opengms.portal.dto.conference.ConferenceAddDTO;
import njgis.opengms.portal.dto.conference.ConferenceFindDTO;
import njgis.opengms.portal.dto.conference.ConferenceResultDTO;
import njgis.opengms.portal.entity.User;
import njgis.opengms.portal.entity.support.Conference;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.UUID;

@Service
public class ConferenceService {
    @Autowired
    UserDao userDao;
    @Autowired
    UserService userService;
    @Autowired
    ConferenceDao conferenceDao;

    public JSONObject listByUserOid(ConferenceFindDTO conferenceFindDTO, String oid){
        int page=conferenceFindDTO.getPage();
        int pageSize = conferenceFindDTO.getPageSize();
        Boolean asc = conferenceFindDTO.getAsc();


        Sort sort=new Sort(asc?Sort.Direction.ASC : Sort.Direction.DESC, "creatDate");
        Pageable pageable= PageRequest.of(page,pageSize,sort);
        User user=userDao.findFirstByOid(oid);
        Page<ConferenceResultDTO> conferenceResultDTOPage=conferenceDao.findByContributor(user.getUserName(),pageable);
        JSONObject result=new JSONObject();
        result.put("list",conferenceResultDTOPage.getContent());
        result.put("total", conferenceResultDTOPage.getTotalElements());

        System.out.println("ConferenceSercice");
        return result;
    }

    public JSONObject searchByTitle(ConferenceFindDTO conferenceFindDTO, String userName){
        int page=conferenceFindDTO.getPage();
        int pageSize = conferenceFindDTO.getPageSize();
        String sortElement=conferenceFindDTO.getSortElement();
        Boolean asc = conferenceFindDTO.getAsc();
        String title= conferenceFindDTO.getSearchText();

        Sort sort=new Sort(asc?Sort.Direction.ASC:Sort.Direction.ASC,sortElement);
        Pageable pageable=PageRequest.of(page,pageSize,sort);
        Page<ConferenceResultDTO> conferenceResultDTOPage=conferenceDao.findByTitleContainsIgnoreCaseAndContributor(title,userName,pageable);

        JSONObject result=new JSONObject();
        result.put("list",conferenceResultDTOPage.getContent());
        result.put("total",conferenceResultDTOPage.getTotalElements());
        return result;

    }

    public JSONObject getByUserOidBySort(ConferenceFindDTO conferenceFindDTO , String userName ){
        int page=conferenceFindDTO.getPage();
        int pageSize = conferenceFindDTO.getPageSize();
        String sortElement=conferenceFindDTO.getSortElement();
        Boolean asc = conferenceFindDTO.getAsc();


//        根据创建时间排序
        Sort sort=new Sort(asc?Sort.Direction.ASC : Sort.Direction.DESC, sortElement);
        Pageable pageable= PageRequest.of(page,pageSize,sort);
        Page<ConferenceResultDTO> conferenceResultPage=conferenceDao.findByContributor(userName,pageable);
        JSONObject result=new JSONObject();
        result.put("list",conferenceResultPage.getContent());
        result.put("total", conferenceResultPage.getTotalElements());

        System.out.println(result);
        return result;

    }

    public Conference addNewconference(ConferenceAddDTO conferenceAddDTO, String contributor){
        Conference conference=new Conference();
        BeanUtils.copyProperties(conferenceAddDTO,conference);
        Date now=new Date();
        conference.setCreatDate(now);
        conference.setContributor(contributor);
        conference.setOid(UUID.randomUUID().toString());

        System.out.println("add");

        return conferenceDao.insert(conference);

    }

    public Conference editConference(ConferenceAddDTO conferenceAddDTO,String oid){
        Conference conference=conferenceDao.findFirstByOid(oid);
        if(conference==null) {}
        else {
            conference.setTitle(conferenceAddDTO.getTitle());
            conference.setTheme(conferenceAddDTO.getTheme());
            conference.setConferenceRole(conferenceAddDTO.getConferenceRole());
            conference.setLocation(conferenceAddDTO.getLocation());
            conference.setStartTime(conferenceAddDTO.getStartTime());
            conference.setEndTime(conferenceAddDTO.getEndTime());
        }
        conferenceDao.save(conference);
        return conference;
    }

    public int deleteByOid (String oid,String userName){
        Conference conference=conferenceDao.findFirstByOid(oid);
        if(conference!=null){
            conferenceDao.deleteConferenceByOid(oid);
            userService.modelItemMinusMinus(userName);
            return 1;
        }
        else

            return -1;



    }

}