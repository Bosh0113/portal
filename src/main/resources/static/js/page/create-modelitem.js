var vue = new Vue({
    el: "#app",
    data: {
        defaultActive:'2-1',
        curIndex:'2-1',

        ScreenMaxHeight: "0px",
        IframeHeight: "0px",
        editorUrl: "",
        load: false,


        ScreenMinHeight: "0px",

        userId: "",
        userName: "",
        loginFlag: false,
        activeIndex: 2,

        userInfo:{
            //username:"",
            name:"",
            email:"",
            phone:"",
            insName:""
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
        },
        cls:[],
        clsStr:'',


    },
    methods: {
        handleSelect(index,indexPath){
            this.setSession("index",index);
            window.location.href="/user/userSpace"
        },
        handleCheckChange(data, checked, indeterminate) {
            let checkedNodes = this.$refs.tree2.getCheckedNodes()
            let classes = [];
            let str='';
            for (let i = 0; i < checkedNodes.length; i++) {
                // console.log(checkedNodes[i].children)
                if(checkedNodes[i].children!=undefined){
                    continue;
                }

                classes.push(checkedNodes[i].oid);
                str+=checkedNodes[i].label;
                if(i!=checkedNodes.length-1){
                    str+=", ";
                }
            }
            this.cls=classes;
            this.clsStr=str;

        },
        changeOpen(n) {
            this.activeIndex = n;
        },
        setSession(name, value) {
            window.sessionStorage.setItem(name, value);
        },
        getUserData(UsersInfo, prop) {
            let index=0;
            for(i=0;i<UsersInfo.length;i+=4){
                let value1 = UsersInfo.eq(i)[0].value.trim();
                let value2 = UsersInfo.eq(i)[0].value.trim();
                let value3 = UsersInfo.eq(i)[0].value.trim();
                let value4 = UsersInfo.eq(i)[0].value.trim();
                if(value1==''&&value2==''&&value3==''&&value4==''){
                    index=i+4;
                }

            }
            for (i = prop.length; i > 0; i--) {
                prop.pop();
            }
            var result = "{";
            for (; index < UsersInfo.length; index++) {
                //
                var Info = UsersInfo.eq(index)[0];
                if (index % 4 == 3) {
                    if (result) {
                        result += "'" + Info.name + "':'" + Info.value + "'}"
                        prop.push(eval('(' + result + ')'));
                    }
                    result = "{";
                }
                else {
                    result += "'" + Info.name + "':'" + Info.value + "',";
                }

            }
        },
    },
    mounted() {
        //table
        table = $('#dynamic-table').DataTable({
            //"aaSorting": [[ 0, "asc" ]],
            "paging": false,
            // "ordering":false,
            "info": false,
            "searching": false
        });
        $("#dynamic-table").css("display", "none")
        //$('#dynamic-table').dataTable().fnAddData(['111','111','111','1111','1111']);
        // $("#addref").click(function(){
        //     $("#refinfo").modal("show");
        // })
        $("#doiSearch").click(function () {
            $("#doi_searchBox").addClass("spinner")
            $.ajax({
                data: "Get",
                url: "/modelItem/DOISearch",
                data: {
                    doi: $("#doi_searchBox").val()
                },
                cache: false,
                async: true,
                success: (data) => {
                    data=data.data;
                    $("#doi_searchBox").removeClass("spinner")
                    if (data == "ERROR") {
                        alert(data);
                    }
                    // if(!json.doi){
                    //     alert("ERROR")
                    // }
                    else {
                        var json = eval('(' + data + ')');
                        console.log(json)
                        $("#doiTitle").val(json.title)
                        $("#doiAuthor").val(json.author)
                        $("#doiDate").val(json.month + " " + json.year)
                        $("#doiJournal").val(json.journal)
                        $("#doiPages").val(json.pages)
                        $("#doiLink").val(json.adsurl)
                        $("#doiDetails").css("display", "block");

                    }
                },
                error: (data) => {
                    $("#doi_searchBox").removeClass("spinner")
                    alert("ERROR!")
                    $("#doiDetails").css("display", "none");
                    $("#doiTitle").val("")
                }
            })


        });
        $("#modal_cancel").click(function () {
            $("#refTitle").val("")
            var tags = $('#refAuthor').tagEditor('getTags')[0].tags;
            for (i = 0; i < tags.length; i++) { $('#refAuthor').tagEditor('removeTag', tags[i]); }
            $("#refDate").val("")
            $("#refJournal").val("")
            $("#refPages").val("")
            $("#refLink").val("")

            $("#doiDetails").css("display", "none");
            $("#doiTitle").val("")
        })
        $("#modal_save").click(function () {

            if ($(".nav-tabs li").eq(0)[0].className == "active") {
                if ($("#refTitle").val().trim() == "") {
                    alert("Please Enter Title");
                }
                else {
                    table.row.add([
                        $("#refTitle").val(),
                        $("#refAuthor").val(),
                        $("#refDate").val(),
                        $("#refJournal").val(),
                        $("#refPages").val(),
                        $("#refLink").val(), "<center><a href='javascript:;' class='fa fa-times refClose' style='color:red'></a></center>"]).draw();

                    $("#dynamic-table").css("display", "block")
                    $("#refinfo").modal("hide")
                    $("#refTitle").val("")
                    var tags = $('#refAuthor').tagEditor('getTags')[0].tags;
                    for (i = 0; i < tags.length; i++) { $('#refAuthor').tagEditor('removeTag', tags[i]); }
                    $("#refDate").val("")
                    $("#refJournal").val("")
                    $("#refPages").val("")
                    $("#refLink").val("")
                }

            }
            else {
                if ($("#doiTitle").val() == "") {
                    alert("Details are empty");
                }
                else {
                    table.row.add([
                        $("#doiTitle").val(),
                        $("#doiAuthor").val(),
                        $("#doiDate").val(),
                        $("#doiJournal").val(),
                        $("#doiPages").val(),
                        $("#doiLink").val(), "<center><a href='javascript:;' class='fa fa-times refClose' style='color:red'></a></center>"]).draw();
                    $("#dynamic-table").css("display", "block")
                    $("#refinfo").modal("hide")
                    $("#doiDetails").css("display", "none");
                    $("#doiTitle").val("");
                }
            }


        })
        //table end

        $(document).on("click", ".refClose", function () {
            table.row($(this).parents("tr")).remove().draw();
            //$(this).parents("tr").eq(0).remove();
            console.log($("tbody tr"));
            if ($("tbody tr").eq(0)[0].innerText == "No data available in table") {
                $("#dynamic-table").css("display", "none")
            }
        });

        var oid = window.sessionStorage.getItem("editModelItem_id");

        var user_num = 0;

        if ((oid === "0") || (oid === "") || (oid === null)) {

            tinymce.init({
                selector: "textarea#myText",
                height: 350,
                theme: 'modern',
                plugins: ['link', 'table', 'image', 'media'],
                image_title: true,
                // enable automatic uploads of images represented by blob or data URIs
                automatic_uploads: true,
                // URL of our upload handler (for more details check: https://www.tinymce.com/docs/configure/file-image-upload/#images_upload_url)
                // images_upload_url: 'postAcceptor.php',
                // here we add custom filepicker only to Image dialog
                file_picker_types: 'image',

                file_picker_callback: function (cb, value, meta) {
                    var input = document.createElement('input');
                    input.setAttribute('type', 'file');
                    input.setAttribute('accept', 'image/*');
                    input.onchange = function () {
                        var file = input.files[0];

                        var reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = function () {
                            var img = reader.result.toString();
                            cb(img, {title: file.name});
                        }
                    };
                    input.click();
                },
                images_dataimg_filter: function (img) {
                    return img.hasAttribute('internal-blob');
                }
            });
        }
        else {
            $.ajax({
                url: "/modelItem/getInfo/" + oid,
                type: "get",
                data: {},

                success: (result) => {
                    console.log(result)
                    var basicInfo = result.data;

                    //cls
                    this.cls = basicInfo.classifications;
                    let ids=[];
                    for(i=0;i<this.cls.length;i++){
                        for(j=0;j<4;j++){
                            for(k=0;k<this.treeData[j].children.length;k++){
                                if(this.cls[i]==this.treeData[j].children[k].oid){
                                    ids.push(this.treeData[j].children[k].id);
                                    this.clsStr+=this.treeData[j].children[k].label;
                                    if(i!=this.cls.length-1){
                                        this.clsStr+=", ";
                                    }
                                    break;
                                }
                            }
                            if(ids.length-1==i){
                                break;
                            }
                        }
                    }

                    this.$refs.tree2.setCheckedKeys(ids);

                    $(".providers").children(".panel").remove();

                    let authorship = basicInfo.authorship;
                    if(authorship!=null) {
                        for (i = 0; i < authorship.length; i++) {
                            user_num++;
                            var content_box = $(".providers");
                            var str = "<div class='panel panel-primary'> <div class='panel-heading'> <h4 class='panel-title'> <a class='accordion-toggle collapsed' style='color:white' data-toggle='collapse' data-target='#user";
                            str += user_num;
                            str += "' href='javascript:;'> NEW </a> </h4><a href='javascript:;' class='fa fa-times author_close' style='float:right;margin-top:8px;color:white'></a></div><div id='user";
                            str += user_num;
                            str += "' class='panel-collapse collapse in'><div class='panel-body user-contents'> <div class='user-attr'>\n" +
                                "                                                                                                    <div>\n" +
                                "                                                                                                        <lable class='control-label col-sm-2 text-center'\n" +
                                "                                                                                                               style='font-weight: bold;'>\n" +
                                "                                                                                                            Name:\n" +
                                "                                                                                                        </lable>\n" +
                                "                                                                                                        <div class='input-group col-sm-10'>\n" +
                                "                                                                                                            <input type='text'\n" +
                                "                                                                                                                   name=\"name\"\n" +
                                "                                                                                                                   class='form-control' value='" +
                                authorship[i].name +
                                "'>\n" +
                                "                                                                                                        </div>\n" +
                                "                                                                                                    </div>\n" +
                                "                                                                                                    <div style=\"margin-top:10px\">\n" +
                                "                                                                                                        <lable class='control-label col-sm-2 text-center'\n" +
                                "                                                                                                               style='font-weight: bold;'>\n" +
                                "                                                                                                            Affiliation:\n" +
                                "                                                                                                        </lable>\n" +
                                "                                                                                                        <div class='input-group col-sm-10'>\n" +
                                "                                                                                                            <input type='text'\n" +
                                "                                                                                                                   name=\"ins\"\n" +
                                "                                                                                                                   class='form-control' value='" +
                                authorship[i].ins +
                                "'>\n" +
                                "                                                                                                        </div>\n" +
                                "                                                                                                    </div>\n" +
                                "                                                                                                    <div style=\"margin-top:10px\">\n" +
                                "                                                                                                        <lable class='control-label col-sm-2 text-center'\n" +
                                "                                                                                                               style='font-weight: bold;'>\n" +
                                "                                                                                                            Email:\n" +
                                "                                                                                                        </lable>\n" +
                                "                                                                                                        <div class='input-group col-sm-10'>\n" +
                                "                                                                                                            <input type='text'\n" +
                                "                                                                                                                   name=\"email\"\n" +
                                "                                                                                                                   class='form-control' value='" +
                                authorship[i].email +
                                "'>\n" +
                                "                                                                                                        </div>\n" +
                                "                                                                                                    </div>\n" +
                                "                                                                                                    <div style=\"margin-top:10px\">\n" +
                                "                                                                                                        <lable class='control-label col-sm-2 text-center'\n" +
                                "                                                                                                               style='font-weight: bold;'>\n" +
                                "                                                                                                            Homepage:\n" +
                                "                                                                                                        </lable>\n" +
                                "                                                                                                        <div class='input-group col-sm-10'>\n" +
                                "                                                                                                            <input type='text'\n" +
                                "                                                                                                                   name=\"homepage\"\n" +
                                "                                                                                                                   class='form-control' value='" +
                                authorship[i].homepage +
                                "'>\n" +
                                "                                                                                                        </div>\n" +
                                "                                                                                                    </div>\n" +
                                "                                                                                                </div></div> </div> </div>"
                            content_box.append(str)
                        }
                    }


                    $("#nameInput").val(basicInfo.name);
                    $("#descInput").val(basicInfo.description);

                    //image
                    if (basicInfo.image != "") {
                        $("#imgShow").attr("src", basicInfo.image);
                        $('#imgShow').show();
                    }
                    //reference

                    for (i = 0; i < basicInfo.references.length; i++) {
                        var ref = basicInfo.references[i];
                        table.row.add([
                            ref.title,
                            ref.author,
                            ref.date,
                            ref.journal,
                            ref.pages,
                            ref.links,
                            "<center><a href='javascript:;' class='fa fa-times refClose' style='color:red'></a></center>"]).draw();
                    }
                    if (basicInfo.references.length > 0) {
                        $("#dynamic-table").css("display", "block")
                    }

                    //detail
                    tinymce.remove("textarea#myText");
                    $("#myText").html(basicInfo.detail);
                    tinymce.init({
                        selector: "textarea#myText",
                        height: 300,
                        theme: 'modern',
                        plugins: ['link', 'table', 'image', 'media'],
                        image_title: true,
                        // enable automatic uploads of images represented by blob or data URIs
                        automatic_uploads: true,
                        // URL of our upload handler (for more details check: https://www.tinymce.com/docs/configure/file-image-upload/#images_upload_url)
                        // images_upload_url: 'postAcceptor.php',
                        // here we add custom filepicker only to Image dialog
                        file_picker_types: 'image',

                        file_picker_callback: function (cb, value, meta) {
                            var input = document.createElement('input');
                            input.setAttribute('type', 'file');
                            input.setAttribute('accept', 'image/*');
                            input.onchange = function () {
                                var file = input.files[0];

                                var reader = new FileReader();
                                reader.readAsDataURL(file);
                                reader.onload = function () {
                                    var img = reader.result.toString();
                                    cb(img, {title: file.name});
                                }
                            };
                            input.click();
                        },
                        images_dataimg_filter: function (img) {
                            return img.hasAttribute('internal-blob');
                        }
                    });

                    //tags

                    $('#tagInput').tagEditor({
                        initialTags: basicInfo.keywords,
                        forceLowercase: false,
                        placeholder: 'Enter keywords ...'
                    });
                    $(".tag-editor").eq(0).remove();

                }
            })
            window.sessionStorage.setItem("editModelItem_id", "");
        }


        $.ajax({
            type: "GET",
            url: "/user/load",
            data: {

            },
            cache: false,
            async: false,
            success: (data) => {
                data=JSON.parse(data);
                console.log(data);
                if (data.oid == "") {
                    alert("Please login");
                    window.location.href = "/user/login";
                }
                else {
                    this.userId = data.oid;
                    this.userName = data.name;
                    //$("#provider_body .providers h4 a").eq(0).text(data.name);
                    // $.get("http://localhost:8081/GeoModelingNew/UserInfoServlet",{"userId":this.userId},(result)=> {
                    //     this.userInfo=eval('('+result+')');
                    //     console.log(this.userInfo)
                    // })
                }
            }
        })

        let height = document.documentElement.clientHeight;
        this.ScreenMaxHeight = (height) + "px";
        this.IframeHeight = (height - 20) + "px";

        window.onresize = () => {
            console.log('come on ..');
            height = document.documentElement.clientHeight;
            this.ScreenMaxHeight = (height) + "px";
            this.IframeHeight = (height - 20) + "px";
        }


        var modelItemObj = {};
        $(".next").click(()=> {
            modelItemObj.classifications = this.cls;//[$("#parentNode").attr("pid")];
            modelItemObj.name = $("#nameInput").val();
            modelItemObj.keywords = $("#tagInput").val().split(",");
            modelItemObj.description = $("#descInput").val();
            modelItemObj.image = $('#imgShow').get(0).src;
            modelItemObj.authorship=[];

            if (this.cls.length == 0) {
                alert("Please select parent node");
                return false;
            }
            if ($("#nameInput").val() === "") {
                alert("Please enter model item name");
                return false;
            }
        });

        $(".finish").click(()=> {
            modelItemObj.classifications = this.cls;//[$("#parentNode").attr("pid")];
            modelItemObj.name = $("#nameInput").val();
            modelItemObj.keywords = $("#tagInput").val().split(",");
            modelItemObj.description = $("#descInput").val();
            modelItemObj.uploadImage = $('#imgShow').get(0).currentSrc;
            modelItemObj.authorship=[];
            this.getUserData($("#providersPanel .user-contents .form-control"), modelItemObj.authorship);

            // modelItemObj.Providers = [];
            // getUserData($("#providersPanel .user-contents .form-control"), modelItemObj.Providers)

            modelItemObj.references = new Array();
            var ref_lines = $("#dynamic-table tr");
            for (i = 1; i < ref_lines.length; i++) {
                var ref_prop = ref_lines.eq(i).children("td");
                if (ref_prop != 0) {
                    var ref = {};
                    ref.title = ref_prop.eq(0).text();
                    if (ref.title == "No data available in table")
                        break;
                    ref.author = ref_prop.eq(1).text().split(",");
                    ref.date = ref_prop.eq(2).text();
                    ref.journal = ref_prop.eq(3).text();
                    ref.pages = ref_prop.eq(4).text();
                    ref.links = ref_prop.eq(5).text();
                    modelItemObj.references.push(ref);
                }
            }

            var detail = tinyMCE.activeEditor.getContent();
            modelItemObj.detail = detail.trim();
            console.log(modelItemObj)

            if ((oid === "0") || (oid === "") || (oid == null)) {
                $.ajax({
                    url: "/modelItem/add",
                    type: "POST",
                    async: true,
                    contentType: "application/json",
                    data: JSON.stringify(modelItemObj),
                    success: function (result) {

                        if (result.code == "0") {
                            alert("Create Success");

                            window.location.href = "/modelItem/" + result.data;
                            //window.location.reload();
                        }
                    }
                })
            } else {
                modelItemObj["oid"] = oid;
                $.ajax({
                    url: "/modelItem/update",
                    type: "POST",
                    async: true,
                    contentType: "application/json",
                    data: JSON.stringify(modelItemObj),

                    success: function (result) {
                        if (result.code === 0) {
                            alert("Update Success");
                            $("#editModal",parent.document).remove();


                            // window.location.href = "/modelItem/" + result.data;
                            //window.location.reload();
                        }
                    }
                })
            }
        });


        $(document).on("click", ".author_close", function () { $(this).parents(".panel").eq(0).remove(); });


        //作者添加

        $(".user-add").click(function () {
            user_num++;
            var content_box = $(this).parent().children('div');
            var str = "<div class='panel panel-primary'> <div class='panel-heading'> <h4 class='panel-title'> <a class='accordion-toggle collapsed' style='color:white' data-toggle='collapse' data-target='#user";
            str += user_num;
            str += "' href='javascript:;'> NEW </a> </h4><a href='javascript:;' class='fa fa-times author_close' style='float:right;margin-top:8px;color:white'></a></div><div id='user";
            str += user_num;
            str += "' class='panel-collapse collapse in'><div class='panel-body user-contents'> <div class='user-attr'>\n" +
                "                                                                                                    <div>\n" +
                "                                                                                                        <lable class='control-label col-sm-2 text-center'\n" +
                "                                                                                                               style='font-weight: bold;'>\n" +
                "                                                                                                            Name:\n" +
                "                                                                                                        </lable>\n" +
                "                                                                                                        <div class='input-group col-sm-10'>\n" +
                "                                                                                                            <input type='text'\n" +
                "                                                                                                                   name=\"name\"\n" +
                "                                                                                                                   class='form-control'>\n" +
                "                                                                                                        </div>\n" +
                "                                                                                                    </div>\n" +
                "                                                                                                    <div style=\"margin-top:10px\">\n" +
                "                                                                                                        <lable class='control-label col-sm-2 text-center'\n" +
                "                                                                                                               style='font-weight: bold;'>\n" +
                "                                                                                                            Affiliation:\n" +
                "                                                                                                        </lable>\n" +
                "                                                                                                        <div class='input-group col-sm-10'>\n" +
                "                                                                                                            <input type='text'\n" +
                "                                                                                                                   name=\"ins\"\n" +
                "                                                                                                                   class='form-control'>\n" +
                "                                                                                                        </div>\n" +
                "                                                                                                    </div>\n" +
                "                                                                                                    <div style=\"margin-top:10px\">\n" +
                "                                                                                                        <lable class='control-label col-sm-2 text-center'\n" +
                "                                                                                                               style='font-weight: bold;'>\n" +
                "                                                                                                            Email:\n" +
                "                                                                                                        </lable>\n" +
                "                                                                                                        <div class='input-group col-sm-10'>\n" +
                "                                                                                                            <input type='text'\n" +
                "                                                                                                                   name=\"email\"\n" +
                "                                                                                                                   class='form-control'>\n" +
                "                                                                                                        </div>\n" +
                "                                                                                                    </div>\n" +
                "                                                                                                    <div style=\"margin-top:10px\">\n" +
                "                                                                                                        <lable class='control-label col-sm-2 text-center'\n" +
                "                                                                                                               style='font-weight: bold;'>\n" +
                "                                                                                                            Homepage:\n" +
                "                                                                                                        </lable>\n" +
                "                                                                                                        <div class='input-group col-sm-10'>\n" +
                "                                                                                                            <input type='text'\n" +
                "                                                                                                                   name=\"homepage\"\n" +
                "                                                                                                                   class='form-control'>\n" +
                "                                                                                                        </div>\n" +
                "                                                                                                    </div>\n" +
                "                                                                                                </div></div> </div> </div>"
            content_box.append(str)
        })

        $(document).on("keyup", ".username", function () {

            if ($(this).val()) {
                $(this).parents('.panel').eq(0).children('.panel-heading').children().children().html($(this).val());
            }
            else {
                $(this).parents('.panel').eq(0).children('.panel-heading').children().children().html("NEW");
            }
        })

        //var mid = window.sessionStorage.getItem("editModelItem_id");
        // if (mid === undefined || mid == null) {
        //     this.editorUrl = "http://127.0.0.1:8081http://127.0.0.1:8081/GeoModelingNew/modelItem/createModelItem.html";
        // } else {
        //     this.editorUrl = "http://127.0.0.1:8081http://127.0.0.1:8081/GeoModelingNew/modelItem/createModelItem.html?mid=" + mid;
        // }
    }
})