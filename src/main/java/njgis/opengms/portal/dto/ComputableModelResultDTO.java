package njgis.opengms.portal.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import njgis.opengms.portal.entity.support.AuthorInfo;
import org.springframework.data.annotation.Id;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ComputableModelResultDTO {
    @Id
    String id;
    String oid;
    String name;
    String image;
    String relateModelItem;
    String relateModelItemName;
    String description;
    String author;
    String status;
    String detail;

    Boolean isAuthor;
    AuthorInfo realAuthor;
    String contentType;
    String url;
    String modelserUrl;

    String md5;
    Boolean deploy;

    List<String> classifications;
    List<String> keywords;
    //    List<String> contributors;
    List<String> resources;
    List<String> deployedService;
    List<String> containerId;
    List<AuthorInfo> authorship;

//    ComputableModelRelate relate;

    Date createTime;
    Date lastModifyTime;

    int shareCount=0;
    int viewCount=0;
    int thumbsUpCount=0;

    boolean lock;

    String mdl;
    String testDataPath;

    Object mdlJson;
}
