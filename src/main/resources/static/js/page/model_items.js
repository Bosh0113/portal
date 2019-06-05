new Vue({
    el: '#app',
    components: {
        'avatar': VueAvatar.Avatar
    },
    data: function () {
        return {
            activeIndex: '2',
            queryType: 'normal',
            searchText: '',
            classifications1: ["652bf1f8-2f3e-4f93-b0dc-f66505090873"],
            classifications2: ["652bf1f8-2f3e-4f93-b0dc-f66505090873"],

            currentClass: "Hydrosphere",

            pageOption: {
                paginationShow:false,
                progressBar: true,
                sortAsc: false,
                currentPage: 1,
                pageSize: 10,

                total: 0,
                searchResult: [],
            },

            treeData: [{
                id: 1,
                label: 'Earth System',
                oid: 'fc236e9d-3ae9-4594-b9b8-de0ac336a1d7',
                children: [{
                    id: 2,
                    label: 'Hydrosphere',
                    oid: '652bf1f8-2f3e-4f93-b0dc-f66505090873'
                }, {
                    id: 3,
                    label: 'Lithosphere',
                    oid: 'a621ea24-26d5-4027-a8de-d418509dacb2'
                }, {
                    id: 4,
                    label: 'Atmosphere',
                    oid: '5e324fc8-93d1-40bb-a2e4-24d2dff68c4b'
                }, {
                    id: 5,
                    label: 'Biosphere',
                    oid: '76cb072d-8f56-4e34-9ea6-1a95ea7f474b'
                }, {
                    id: 6,
                    label: 'Anthroposphere',
                    oid: 'eccbe4e1-32f6-490e-9bf7-ae774be472ac'

                }, {
                    id: 7,
                    label: 'Global',
                    oid: '1a59f012-0659-479d-a183-b74921c67a08'
                }]
            }, {
                id: 8,
                label: 'Physical Geography',
                oid: '44068d3f-533a-4567-9bfd-07eea9d9e8af',
                children: [{
                    id: 9,
                    label: 'Hydrology',
                    oid: '158690be-1a1d-4e09-86a5-cbd5c0104206'
                }, {
                    id: 10,
                    label: 'Geomorphology',
                    oid: '17b746ad-7dcf-4aa5-90b5-104c041caf62'
                }, {
                    id: 11,
                    label: 'Geology',/////
                    oid: '19bff3af-4c8d-4d98-9ad0-18e34a818a50'
                }, {
                    id: 12,
                    label: 'Glaciology',
                    oid: 'cfc349aa-63dc-498a-a9e0-6867bad3a2a6'
                }, {
                    id: 13,
                    label: 'Biogeography',
                    oid: '7656e180-c975-47fe-8ea6-abf417a94793'
                }, {
                    id: 14,
                    label: 'Meteorology',
                    oid: 'e3e1e879-ce41-46a5-b72c-55501bb08ce8'
                }, {
                    id: 15,
                    label: 'Climatology',
                    oid: 'dcb2fa01-5507-4fbd-a533-1b7336cd497b'
                }, {
                    id: 16,
                    label: 'Pedology',
                    oid: '40d18155-6669-4416-990c-de0374ab587e'
                }, {
                    id: 17,
                    label: 'Oceanography',
                    oid: 'ea1f9c14-9bdb-4da6-b728-a9853620e95f'
                }, {
                    id: 18,
                    label: 'Coastal Geography',
                    oid: '12b11f3e-8d6e-48c9-bf3a-f9fb5c5e0dd4'
                }, {
                    id: 19,
                    label: 'Landscape Ecology',
                    oid: '00190eef-017f-42b3-8500-baf612083557'
                }, {
                    id: 20,
                    label: 'Ecosystem',
                    oid: '60d4f9cf-df22-4313-8b53-c7c314455f2d'
                }, {
                    id: 21,
                    label: 'Paleogeography',
                    oid: '6965468a-f952-4adf-87e9-6dc2988ab7f8'
                }, {
                    id: 22,
                    label: 'Quaternary Science',
                    oid: '9de1a9a7-4f84-4f8d-9ee6-3aaa33681e29'
                }, {
                    id: 23,
                    label: 'Environmental Management',
                    oid: '5d8d6338-0624-40dd-8519-ec440b47c174'
                }, {
                    id: 24,
                    label: 'Global Synthesis',
                    oid: 'a0c97d7a-54c6-4bbe-8e6d-9fe9b2234a1e'
                }, {
                    id: 25,
                    label: 'Regional Synthesis',/////
                    oid: 'aacf6bc4-8280-4f75-919d-3e4be604dd88'
                }, {
                    id: 26,
                    label: 'Others',
                    oid: 'f69d3040-abad-477d-9194-b6ee5303bd9a'
                }]
            }, {
                id: 27,
                label: 'Human Geography',
                oid: '3a76212e-c4f2-4a99-ab98-51ae5e7cf7e0',
                children: [{
                    id: 28,
                    label: 'Agricultural Geography',
                    oid: '7cf1aa10-58c0-4329-9a1d-9ace0cc2ba33'
                }, {
                    id: 29,
                    label: 'Industrial Geography',
                    oid: 'e9590d02-c1bf-4f92-878c-4f2857fc9c33'
                }, {
                    id: 30,
                    label: 'Traffic Geography',
                    oid: '64eb0340-6312-4549-9671-6bd635d5a8b3'
                }, {
                    id: 31,
                    label: 'Tourism Geography',
                    oid: 'bfa6147d-700e-4e06-978e-c9f0266608a8'
                }, {
                    id: 32,
                    label: 'Population Geography',/////
                    oid: 'a9fc055b-99a1-40c9-82de-626de69efc04'
                }, {
                    id: 33,
                    label: 'Regional Geography',
                    oid: '0be6cd3b-a459-45df-b7e7-b2fb23aafd12'
                }, {
                    id: 34,
                    label: 'Urban Geography',
                    oid: '51574401-09d9-4819-aa3e-17994e0396fd'
                }, {
                    id: 35,
                    label: 'Rural Geography',/////
                    oid: 'b0cc3872-2c89-428a-ac50-7d30f7638373'
                }, {
                    id: 36,
                    label: 'Historical Geography',
                    oid: '9efcb0d7-9374-4fa4-b1c3-8a9409320813'
                }, {
                    id: 37,
                    label: 'Cultural Geography',
                    oid: '13e811de-f061-432b-9ed4-85bda9d385c7'
                }, {
                    id: 38,
                    label: 'Social Geography',
                    oid: 'dfb2fc17-f084-4e6b-ae89-ef35f4563be3'
                }, {
                    id: 39,
                    label: 'Economic Geography',
                    oid: '6d4b41d2-6922-4642-bfe4-235a55002f67'
                }, {
                    id: 40,
                    label: 'Political Geography',
                    oid: '7a5fdbe5-ac48-45ea-a56a-29ff10e32789'
                }, {
                    id: 41,
                    label: 'Health Geography',
                    oid: '0761b9dc-4324-46f0-a8d5-3516fd6308d9'
                }, {
                    id: 42,
                    label: 'Development Geography',
                    oid: '671c0a46-fc81-47ed-94c3-af12c696156b'
                }, {
                    id: 43,
                    label: 'Behavioral Geography',
                    oid: 'f25d4aa8-3adf-47fa-8b8d-adf885e7c5aa'
                }, {
                    id: 44,
                    label: 'Global Synthesis',
                    oid: 'd4ceefe8-0c2b-4ea1-af1d-a7e0f3c7218c'
                }, {
                    id: 45,
                    label: 'Regional Synthesis',/////
                    oid: 'ea50ad38-0b15-49b4-a183-676ba7487446'
                }, {
                    id: 46,
                    label: 'Others',
                    oid: 'ba898bbd-1902-44ae-ac3f-0cc5bc944bc5'
                }]
            }, {
                id: 47,
                label: 'GIScience & Remote Sensing',
                oid: '3afc51dc-930d-4ab5-8a59-3e057b7eb086',
                children: [{
                    id: 48,
                    "label": "Shape Processing",
                    "oid": "e6984ef1-4f69-4f6e-be2b-c77f917de5a5",
                },
                    {
                        id: 49,
                        "label": "Grid Processing",
                        "oid": "944d3c82-ddeb-4b02-a56c-44eb419ecc13",
                    },
                    {
                        id: 50,
                        "label": "Imagery Processing",
                        "oid": "5e184a2e-2579-49bf-ebac-7c28b24a38e3",
                    },
                    {
                        id: 51,
                        "label": "Data Management",
                        "oid": "6cc12923-edc1-4faf-8c7d-a14240cd897b",
                    },
                    {
                        id: 52,
                        "label": "Spatial Analysis",
                        "oid": "d7f96d42-b6c5-4984-81f6-6589cff37285",
                    },
                    {
                        id: 53,
                        "label": "Geostatistics",
                        "oid": "f08f8694-1909-4ca2-b943-e8db0c0f5439",
                    },
                    {
                        id: 54,
                        "label": "Terrain Analysis",
                        "oid": "b74f0952-143b-4af7-8fa6-ad9bf4787cb9",
                    },
                    {
                        id: 55,
                        "label": "3D Analyst",
                        "oid": "340c275a-1ed4-495b-8415-a6a4bfe4eb18",
                    },{
                        id: 56,
                        "label": "Network Analysis",
                        "oid": "fa7d7d50-098e-4cd7-92c7-31755b3ca371",
                    },{
                        id: 57,
                        "label": "Geographic Simulation",
                        "oid": "ab1f3806-1ed8-4fd9-ff06-b6c2ca020ae9",
                    },
                    {
                        id: 58,
                        "label": "Climate Tools",
                        "oid": "40b78ccf-e430-4756-84d7-9dfdd9ccfcad"
                    },{
                        id: 59,
                        "label": "Generic Tools",
                        "oid": "77567bff-52b9-4833-885d-417bd3a6c0e9"
                    },{
                        id: 60,
                        label: 'Cartography',
                        oid: '854189a4-3811-441d-a9d1-7de58e57a37f'
                    },
                    {
                        id: 61,
                        label: 'Remote Sensing Imagery',
                        oid: '84e1090a-3f27-43fe-b912-d0dd7e9c8677'
                    }, {
                        id: 62,
                        label: 'Ground Feature Spectrum',
                        oid: '63097163-10e5-4e16-8335-590dcc7156ba'
                    }, {
                        id: 63,
                        label: 'Others',/////
                        oid: '10bef187-00bf-4cea-b192-bf1465a265b1'
                    }]
            }
                // , {
                //     id: 3,
                //     label: 'Others',
                //     children: [{
                //         label: 'Others'
                //     }]
                // }
            ],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }
    },
    methods: {
        contribute(){
            $.ajax({
                url: '/user/load',
                type: 'get',
                // data对象中的属性名要和服务端控制器的参数名一致 login(name, password)
                // dataType : 'json',
                success: function (result) {
                    var json = JSON.parse(result);
                    if (json.oid != '') {
                        window.location.href="/user/createModelItem";
                    }
                    else{
                        window.location.href="/user/login";
                    }
                },
                error: function (e) {
                    alert("load user error");
                }
            });
        },
        search() {
            this.setUrl("/modelItem/repository")
            this.pageOption.currentPage = 1;
            this.classifications1=["all"];
            this.$refs.tree1.setCurrentKey(null);
            this.currentClass="ALL"
            this.getModels();
        },
        //页码change
        handlePageChange(val) {
            let data=this.$refs.tree1.getCurrentNode();
            if(data!=null) {
                this.setUrl("/modelItem/repository?category=" + data.oid + "&page=" + val);
            }
            this.pageOption.currentPage = val;

            window.scrollTo(0, 0);
            this.getModels();
        },
        handleCurrentChange(data, checked, indeterminate) {
            this.setUrl("/modelItem/repository?category="+data.oid);
            this.pageOption.searchResult=[];
            this.pageOption.total=0;
            this.pageOption.paginationShow=false;
            this.currentClass=data.label;
            let classes = [];
            classes.push(data.oid);
            this.classifications1 = classes;
            //this.getChildren(data.children)
            this.pageOption.currentPage=1;
            this.searchText="";
            this.getModels();
        },
        getChildren(children) {
            if (children != null) {
                for (let i = 0; i < children.length; i++) {
                    let child = children[i];
                    this.classifications1.push(child.oid);
                    this.getChildren(child.children);
                }
            }
        },
        handleCheckChange(data, checked, indeterminate) {
            this.pageOption.searchResult=[];
            this.pageOption.paginationShow=false;
            let checkedNodes = this.$refs.tree2.getCheckedNodes()
            let classes = [];
            for (let i = 0; i < checkedNodes.length; i++) {
                classes.push(checkedNodes[i].oid);
            }
            this.classifications2 = classes;
            console.log(this.classifications2)
            this.pageOption.currentPage=1;
            this.getModels();
        },
        getModels() {
            this.pageOption.progressBar = true;
            var data = {
                asc: this.pageOption.sortAsc,
                page: this.pageOption.currentPage - 1,
                pageSize: this.pageOption.pageSize,

            };
            switch (this.queryType) {
                case "normal":
                    data.searchText = this.searchText.trim();
                    data.classifications = this.classifications1.length == 0 ? ["all"] : this.classifications1
                    break;
                case "advanced":
                    var connects = $(".connect");
                    var props = $(".prop");
                    var values = $(".value");

                    var connect_arr = new Array();
                    var prop_arr = new Array();
                    var value_arr = new Array();

                    for (i = 0; i < props.length; i++) {
                        prop_arr.push(props.eq(i).text().trim())
                    }
                    for (i = 0; i < values.length; i++) {
                        value_arr.push(values.eq(i).val().trim() == "" ? " " : values.eq(i).val().trim());
                    }
                    for (i = 0; i < connects.length; i++) {
                        connect_arr.push(connects.eq(i).val().trim())
                    }

                    data.connects = connect_arr;
                    data.props = prop_arr;
                    data.values = value_arr;

                    data.classifications = this.classifications2.length == 0 ? ["all"] : this.classifications2

                    break;
            }
            this.Query(data, this.queryType);
        },
        Query(data, type) {
            let sendDate = (new Date()).getTime();
            $.ajax({
                type: "POST",
                url: type == "normal" ? "/modelItem/list" : "/modelItem/advance",
                data: data,
                async: true,
                success: (json) => {
                    if (json.code == 0) {
                        let data = json.data;
                        let receiveDate = (new Date()).getTime();
                        let responseTimeMs = receiveDate - sendDate;
                        let timeoutTime=0;
                        console.log(responseTimeMs)
                        if(responseTimeMs<450){
                            timeoutTime=450-responseTimeMs;
                        }
                        setTimeout(() => {
                            this.pageOption.total = data.total;
                            this.pageOption.pages = data.pages;
                            this.pageOption.searchResult = data.list;
                            this.pageOption.users = data.users;
                            this.pageOption.progressBar = false;
                            this.pageOption.paginationShow=true;
                        }, timeoutTime);
                    }
                    else {
                        console.log("query error!")
                    }
                }
            })
        },
        setUrl(newUrl){
            var stateObject = {};
            var title = "Model Item Repository | OpenGMS";
            history.pushState(stateObject,title,newUrl);
        },
        GetQueryString(name) {

            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");

            var r = window.location.search.substr(1).match(reg);

            if(r!=null)return  unescape(r[2]); return null;

        }
    },
    mounted() {

        let category=this.GetQueryString("category");
        let page=this.GetQueryString("page");
        console.log(category,page)

        if(category!=null) {
            this.classifications1=[];
            this.classifications1.push(category);
            for(i=0;i<this.treeData.length;i++){
                if(category==this.treeData[i].oid){
                    this.$refs.tree1.setCurrentKey(this.treeData[i].id);
                    break;
                }
                else{
                    let children = this.treeData[i].children;
                    let find=false;
                    for(j=0;j<children.length;j++){
                        if(category==children[j].oid){
                            find=true;
                            this.$refs.tree1.setCurrentKey(children[j].id);
                            $(".el-tree-node__expand-icon").eq(i).click();
                            break;
                        }
                    }
                    if(find){
                        break;
                    }
                }

            }
        }
        else{
            this.$refs.tree1.setCurrentKey(2);
            //展开分类树第一层
            $(".el-tree-node__expand-icon").eq(0).click();
        }
        if(page!=null){
            this.pageOption.currentPage=page;
        }

        this.getModels();

        //expend
        $("#expend").click(() => {
            this.setUrl("/modelItem/repository")
            this.queryType = "advanced";
            $(".searcherPanel").css("display", "none");
            $(".advancedSearch").css("display", "block");
            $("#tree1").css("display", "none");
            $("#tree2").css("display", "block");
            if($(".el-checkbox__input").eq(1).hasClass("is-checked")==true){
                this.getModels();
            }
            else {
                $(".el-checkbox__input").eq(1).click();
            }
            $("#curClassBar").hide();
        })
        $("#drawback").click(() => {
            this.queryType = "normal";
            $(".searcherPanel").css("display", "block");
            $(".advancedSearch").css("display", "none");
            $("#tree2").css("display", "none");
            $("#tree1").css("display", "block");
            this.getModels();
            $("#curClassBar").show();
        })

        //field select
        $(document).on("click", ".propName", function () {
            var downArrow = "<span class=\"caret\"></span>";
            $(this).parents(".input-group-btn").children("button").html($(this).text() + downArrow);
        })

        //add
        $(".fa-plus").click(function () {

            var field;
            var lineCount = $(".lines").children(".line").length;
            switch (lineCount) {
                case 1:
                    field = "Keyword";
                    break;
                case 2:
                    field = "Overview";
                    break;
                case 3:
                    field = "Description";
                    break;
                case 4:
                    field = "Provider";
                    break;
                case 5:
                    field = "Reference";
                    break;
            }

            var line = "<div class=\"line\">\n" +
                "                                <div class=\"input-group col-md-1 pull-left\">\n" +
                "                                    <select class=\"form-control connect\">\n" +
                "                                        <option>AND</option>\n" +
                "                                        <option>OR</option>\n" +
                "                                        <option>NOT</option>\n" +
                "                                    </select>\n" +
                "                                </div>\n" +
                "                                <div class=\"input-group col-md-5 pull-left\">\n" +
                "                                    <div class=\"input-group-btn\">\n" +
                "                                        <button type=\"button\" class=\"btn btn-default dropdown-toggle prop\"\n" +
                "                                                data-toggle=\"dropdown\">" + field + "<span class=\"caret\"></span></button>\n" +
                "                                        <ul class=\"dropdown-menu\">\n" +
                "                                            <li><a class=\"propName\" href=\"javascript:void(0);\">Model Name</a></li>\n" +
                "                                            <li><a class=\"propName\" href=\"javascript:void(0);\">Keyword</a></li>\n" +
                "                                            <li><a class=\"propName\" href=\"javascript:void(0);\">Overview</a></li>\n" +
                "                                            <li><a class=\"propName\" href=\"javascript:void(0);\">Description</a></li>\n" +
                "                                            <li><a class=\"propName\" href=\"javascript:void(0);\">Provider</a></li>\n" +
                "                                            <li><a class=\"propName\" href=\"javascript:void(0);\">Reference</a></li>\n" +
                "                                        </ul>\n" +
                "                                    </div>\n" +
                "                                    <input type=\"text\" class=\"form-control value\">\n" +
                "                                </div>\n" +
                "                                <div class=\"input-group col-md-1 pull-left\">\n" +
                "                                    <select class=\"form-control connect\">\n" +
                "                                        <option>AND</option>\n" +
                "                                        <option>OR</option>\n" +
                "                                        <option>NOT</option>\n" +
                "                                    </select>\n" +
                "                                </div>\n" +
                "                                <div class=\"input-group col-md-5 pull-left\">\n" +
                // "                                    <div class=\"input-group-btn\">\n" +
                // "                                        <button type=\"button\" class=\"btn btn-default dropdown-toggle prop\"\n" +
                // "                                                data-toggle=\"dropdown\">\n" +
                // "                                            "+field+"<span class=\"caret\"></span></button>\n" +
                // "                                        <ul class=\"dropdown-menu\">\n" +
                // "                                            <li><a class=\"propName\" href=\"javascript:void(0);\">Model Name</a></li>\n" +
                // "                                            <li><a class=\"propName\" href=\"javascript:void(0);\">Keyword</a></li>\n" +
                // "                                            <li><a class=\"propName\" href=\"javascript:void(0);\">Overview</a></li>\n" +
                // "                                            <li><a class=\"propName\" href=\"javascript:void(0);\">Description</a></li>\n" +
                // "                                            <li><a class=\"propName\" href=\"javascript:void(0);\">Provider</a></li>\n" +
                // "                                            <li><a class=\"propName\" href=\"javascript:void(0);\">Reference</a></li>\n" +
                // "                                        </ul>\n" +
                // "                                    </div>\n" +
                "                                    <input type=\"text\" class=\"form-control value\">\n" +
                "                                </div>\n" +
                "                            </div>";

            if (lineCount <= 5) {
                $(".lines").append(line)
            }
        })
        //delete
        $(".fa-minus").click(function () {
            var lines = $(".lines").children(".line");
            if (lines.length > 1) {
                lines.eq(lines.length - 1).remove();
            }
        })
    }
})