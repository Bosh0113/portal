package njgis.opengms.portal.dto.ComputableModel;

import lombok.Data;

@Data
public class ComputableModelFindDTO {
    private Integer page=1;
    private Integer pageSize;
    private Boolean asc = false;
    private String sortElement;
    private String searchText;
}
