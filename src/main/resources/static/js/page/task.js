var vue = new Vue({
    el: "#app",
    data: {
        radioStyle:"Classic",
        semanticsActiveStates:[0,1,2,3,4,5,6,7,8,9,10],

        tableLoading: true,
        first: true,
        activeIndex: "3-2",
        activeNameGraph: "Image",
        activeName: "Invoke",
        info: {
            dxInfo: {},
            modelInfo: {},
            taskInfo: {},
            userInfo: {}
        },
        showUpload: false,
        showDataChose: false,
        total: 100,
        dataFromDataContainer: [
            {
                createDate: "2016-05-02",
                name: "test",
                type: "OTHER",
                sourceStoreId: "123123"
            },
            {
                createDate: "2016-05-02",
                name: "test2",
                type: "SHAPEFILE",
                sourceStoreId: "123123"
            },
            {
                createDate: "2016-05-02",
                name: "test",
                type: "GEOTIFF",
                sourceStoreId: "123123"
            }
        ],

        relatedDataList:{},

        exampleDataListOfUser:{
            content: [
                {
                    userName:'',
                    runTime:'',
                    description:'',
                    public:[],
                    status:'',
                    currentPage:1,
                }
            ],
            total:0,
        },

        exampleDataList:{
            content: [
                {
                    userName:'',
                    runTime:'',
                    description:'',
                    public:[],
                    status:'',
                    currentPage:1,
                }
                ],
            total:0,
        },

        inEvent: [],
        outEvent: [],
        oid: null,

        fileList: [],

        //select data from user
        selectDataDialog: false,
        userOid: '',
        loading: false,
        userData: [],
        totalNum: '',
        page: 1,
        pageSize: 10,
        sortAsc: false,
        selectData: [],
        keyInput: '',
        modelInEvent: {},
        isFixed: false,
        introHeight: 1,

        dataChosenIndex: 1,
        detailsIndex: 1,
        managerloading: true,
        userTaskInfo: [{
            content: {},
        }],

        downloadDataSet: [],
        downloadDataSetName: [],
        packageContent: {},
        userInfo: {
            runTask: [
                {}
            ]
        },
        searchcontent: '',
        databrowser: [],
        loading: 'false',
        managerloading: true,
        dataid: '',
        rightMenuShow: false,

        introHeight: 1,

        dataItemVisible: false,
        categoryTree: [],
        classifications: [],
        dataItemSearchText: '',
        currentData: {},
        pageOption: {
            page: 0,
            pageSize: 5,
            asc: false,
            searchResult: [],
            total: 0,
        },

        relatePageOption:{
            page: 0,
            pageSize: 5,
            searchResult: [],
            total: 0,
            oid:"",
        },

        loadDataVisible: false,

        showDescriptionVisible: false,

        taskDescription: '',

        fileSpaceIndex: 1,

        myFile: [],

        myFileShown: [
            {
                children: [],
            }
        ],

        fatherIndex: '',

        pathShown: [],

        clickTimeout: 1000,

        rotatevalue: 0,

        fileSearchResult:[],

        loadjson:'',
        paramDialogVisible: false,
        paramType: "",
        externalUrl: "",
        currentEventId: "",

        loadDataIndex:1,

        currentFile:null,
    },
    computed: {},
    watch:{
      currentFile:function (file) {
          this.uploadToDataContainer(file);
      }
    },
    methods: {

        arraySpanMethod({row, column, rowIndex, columnIndex}) {
            if (row.children != undefined && columnIndex === 2) {
                return [1, 3];
            }
        },
        editParam(row) {
            this.currentEventId = row.eventId;
            let data = row.data[0];
            this.paramType = data.dataType;
            if (this.paramType == "internal") {
                this.paramTable = data.nodes;
            }
            else {
                this.externalUrl = "/repository/template/" + data.externalId.toLowerCase();
            }
            this.paramDialogVisible = true;
        },

        uploadToDataContainer(file){

            $.get("/dataManager/dataContainerIpAndPort",(result)=>{
                let ipAndPort=result.data;
                let formData = new FormData();
                formData.append("file",file);
                $.ajax({
                    type:"post",
                    url: "http://"+ipAndPort+"/file/upload/store_dataResource_files",
                    data: formData,
                    async:false,
                    processData: false,
                    contentType: false,
                    success: (result)=>{
                        if (result.code == 0){
                            let data = result.data;
                            let dataName = data.file_name.match(/.+(?=\.)/)[0];
                            let dataSuffix = data.file_name.match(/(?=\.).+/)[0];
                            let dataId = data.source_store_id;
                            let dataUrl = "http://"+ipAndPort+"/dataResource";
                            let form = {
                                "author":"njgis",
                                "fileName":dataName,
                                "sourceStoreId":dataId,
                                "suffix":dataSuffix,
                                "type":"OTHER",
                                "fromWhere":"PORTAL"
                            };

                            $.ajax({
                                type:"post",
                                url: dataUrl,
                                data: JSON.stringify(form),

                                async:false,

                                contentType:'application/json',
                                success:(res) => {
                                    if(res.code == 0){
                                        this.$set(this.eventChoosing,'url',"http://"+ipAndPort+"/dataResource/getResource?sourceStoreId="+res.data.sourceStoreId);
                                        this.$set(this.eventChoosing,'tag',res.data.fileName)
                                        this.$set(this.eventChoosing,'suffix',res.data.suffix)

                                        $("#uploadInputData").val("");
                                        console.log(this.info.modelInfo);

                                    }
                                }
                            })



                        }
                    }
                })
            })
        },

        createAndUploadParamFile() {
            let states = this.info.modelInfo.states;
            for (i = 0; i < states.length; i++) {
                let events = states[i].event;
                let find = false;
                for (j = 0; j < events.length; j++) {
                    let event = events[j];
                    if (event.eventType=="response"&&event.children != undefined) {
                        this.eventChoosing = event;
                        //拼接文件内容
                        let content = "<DataSet>";
                        let children = event.children;
                        for (k = 0; k < children.length; k++) {
                            let child = children[k];
                            content += "<XDO name=\"" + child.eventName + "\" kernelType=\"" + child.eventType + "\" value=\"" + child.value + "\" /> ";
                        }
                        content += "</Dataset>";

                        //生成文件
                        let file = new File([content], event.eventName + '.xml', {
                            type: 'text/plain',
                        });
                        //上传文件
                        this.uploadToDataContainer(file);
                        // let formData = new FormData();
                        // formData.append("file", file);
                        //
                        // formData.append("host", this.info.dxInfo.dxIP);
                        // formData.append("port", this.info.dxInfo.dxPort);
                        // formData.append("type", this.info.dxInfo.dxType);
                        // formData.append("userName", this.info.userInfo.userName);
                        // $.ajax({
                        //     url: "/dispatchRequest/upload",
                        //     type: "POST",
                        //     processData: false,
                        //     contentType: false,
                        //     async: true,
                        //     data: formData,
                        //     success: ({data}) => {
                        //
                        //         let {tag, suffix, url} = data;
                        //         this.eventChoosing.tag = tag;
                        //         this.eventChoosing.suffix = suffix;
                        //         this.eventChoosing.url = url;
                        //
                        //     }
                        // });
                    }
                }
            }

        },
        tableRowKey(row) {
            console.log(row)
            return row.name;
        },

        handlePageChange() {

        },
        handleView() {

        },
        selectFromDataItem(event) {
            this.eventChoosing = event;
            this.dataItemVisible = true;
            // this.relatedDataItem();
        },
        clickData(item, event) {
            console.log(item, event)
            if (this.currentData.url != item.url) {

                this.currentData = item;

                for (let parent of event.path) {
                    if (parent.id == item.url) {
                        $(".dataitemisol").removeClass("clickdataitem");
                        parent.classList.add("clickdataitem")
                        break;
                    }
                }
            }
            else {
                this.currentData = {};
                $(".dataitemisol").removeClass("clickdataitem")
            }
        },
        searchDataItem() {
            this.pageOption.classifications = this.classifications;
            this.pageOption.searchText = this.dataItemSearchText;
            axios.post("/dataItem/searchResourceByNameAndCate/", this.pageOption)
                .then((res) => {
                    console.log(res)
                    this.pageOption.searchResult = res.data.data.list;
                    this.pageOption.total = res.data.data.total;
                });
        },

        relatedDataItem() {
            let paths=window.location.href.split("/");
            this.relatePageOption.oid=paths[paths.length-1];
            axios.get("/computableModel/getRelatedDataByPage", {
                params:this.relatePageOption
            }).then((res) => {
                    console.log(res)
                    this.relatePageOption.searchResult = res.data.list;
                    this.relatePageOption.total = res.data.total;
                });
        },

        chooseCate(item,e){
            if(this.classifications[0]!=item.id){
                $(".taskDataCate").children().css("color","black")
                e.target.style.color='deepskyblue';
                this.classifications.pop();
                this.classifications.push(item.id);
            }
            else{
                e.target.style.color='black';
                this.classifications.pop();
            }

            this.searchDataItem();

        },

        confirmData(){
            if(this.currentDataUrl!="") {
                this.dataItemVisible=false;
                console.log(this.eventChoosing,this.currentData)
                this.eventChoosing.tag = this.currentData.name;
                this.eventChoosing.url = this.currentData.url;
            }
            else {
                this.$message("Please select data first!")
            }
        },
        downloadData() {
            if (this.currentDataUrl != "") {
                window.open("/dispatchRequest/download?url=" + this.currentData.url);
            }
            else {
                this.$message("Please select data first!")
            }
        },

        initSize() {
            this.$nextTick(() => {
                let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                let totalHeight = $('.taskMain').css('height')
                let leftbarHeight = $("#introContainer").css("height");

                if (scrollTop > 62) {
                    $('#introContainer').addClass("fixed")
                    if (parseInt(totalHeight) - parseInt(scrollTop) + 62 < parseInt(leftbarHeight)) {
                        $('#introContainer').removeClass("fixed")
                        $('#introContainer').addClass("stop")
                    } else {
                        $('#introContainer').removeClass("stop")
                        $('#introContainer').addClass("fixed")
                    }
                } else {
                    $('#introContainer').removeClass("fixed")
                }

                // if (parseInt(totalHeight) - parseInt(scrollTop) < 800) {
                //     $('.introContent').css('display', 'none')
                // } else {
                //     $('.introContent').css('display', 'block')
                // }


            })

        },

        showtitle(ev) {
            return ev.fileName + "\n" + "Type:" + ev.suffix;
        },

        generateId(key) {
            return key;
        },

        getUserTaskInfo() {
            let {code, data, msg} = fetch("/user/getUserInfo", {
                method: "GET",
            }).then((response) => {
                return response.json();
            }).then((data) => {
                this.userInfo = data.data.userInfo;
                this.userTaskInfo = this.userInfo.runTask;
                console.log(this.userInfo);
                setTimeout(() => {
                    $('.el-loading-mask').css('display', 'none');
                }, 355)

            });

        },

        share() {
            for (let i = 0; i < this.databrowser.length; i++) {
                if (this.databrowser[i].id === this.dataid) {
                    var item = this.databrowser[i];
                    break;
                }
            }


            if (item != null) {
                let url = "/dataManager/downloadRemote?&sourceStoreId=" + item.sourceStoreId;
                this.$alert("<input style='width: 100%' value=" + url + ">", {
                    dangerouslyUseHTMLString: true
                })
                // this.dataid='';

            } else {
                // console.log("从后台获取数据条目数组有误")
                this.$message('please select file first!!');
            }
        },

        backToPackage() {
            this.detailsIndex = 1;
        },

        dateFormat(date, format) {
            let dateObj = new Date(date);
            let fmt = format || "yyyy-MM-dd hh:mm:ss";
            //author: meizz
            var o = {
                "M+": dateObj.getMonth() + 1, //月份
                "d+": dateObj.getDate(), //日
                "h+": dateObj.getHours(), //小时
                "m+": dateObj.getMinutes(), //分
                "s+": dateObj.getSeconds(), //秒
                "q+": Math.floor((dateObj.getMonth() + 3) / 3), //季度
                S: dateObj.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt))
                fmt = fmt.replace(
                    RegExp.$1,
                    (dateObj.getFullYear() + "").substr(4 - RegExp.$1.length)
                );
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt))
                    fmt = fmt.replace(
                        RegExp.$1,
                        RegExp.$1.length == 1
                            ? o[k]
                            : ("00" + o[k]).substr(("" + o[k]).length)
                    );
            return fmt;
        },
        uploadData() {
            return {
                host: this.info.dxInfo.dxIP,
                port: this.info.dxInfo.dxPort,
                type: this.info.dxInfo.dxType,
                userName: this.info.userInfo.userName
            };
        },
        handleDataDownloadClick({sourceStoreId}) {

            window.open("/dispatchRequest/downloadBySourceStoreId?sourceStoreId=" + sourceStoreId);
        },
        handleDataChooseClick({sourceStoreId, fileName, suffix}) {
            let url =
                "http://172.21.212.64:8082/dataResource/getResource?sourceStoreId=" +
                sourceStoreId;
            this.showDataChose = false;
            this.eventChoosing.tag = fileName + "." + suffix;
            this.eventChoosing.url = url;
        },
        switchClick(i) {
            if (i == 1) {
                $(".tab1").css("display", "block");
                $(".tab2").css("display", "none");
                $(".tab3").css("display", "none");
            } else if (i == 2) {
                $(".tab1").css("display", "none");
                $(".tab2").css("display", "block");
                $(".tab3").css("display", "none");
            } else {
                $(".tab1").css("display", "none");
                $(".tab2").css("display", "none");
                $(".tab3").css("display", "block");
            }

            var btns = $(".switch-btn");

            btns.css("color", "#636363");
            btns.eq(i - 1).css("color", "#428bca");
        },
        init() {
        },
        inEventList(state) {
            return state.event.filter(value => {
                return value.eventType === "response";
            });
        },
        outEventList(state) {
            return state.event.filter(value => {
                return value.eventType === "noresponse";
            });
        },
        filterTag(value, row) {
            return row.fromWhere === value;
        },

        testDataClick(index){
            this.loadDataIndex=index
        },

        myCalcDataClick(index){
            this.loadDataIndex=index
        },

        publishedExampClick(index){
            this.loadDataIndex=index
        },

        loadUserTask(val){
            let href=window.location.href.split('/')
            let modelId=href[href.length-1]

            axios.get("/task/getTasksByModelByUser",{
                    params:
                        {
                            modelId:modelId,
                            page:val-1
                        }
                }
            ).then((res)=>{

                this.exampleDataListOfUser.content=res.data.data.content
                this.exampleDataListOfUser.total=res.data.data.total
                for(let i=0;i<this.exampleDataListOfUser.content.length;i++){
                    this.exampleDataListOfUser.content[i].runTime=this.dateFormat(this.exampleDataListOfUser.content[i].runTime)
                    // this.exampleDataListOfUser.content[i].status=this.exampleDataListOfUser.content[i].public[0]==='public'?'public':'private'
                }
            })
        },

        loadPublishedData(val){
            let href=window.location.href.split('/')
            let modelId=href[href.length-1]

            axios.get("/task/getPublishedTasksByModel",{
                    params:
                        {
                            modelId:modelId,
                            page:val-1
                        }
                }
            ).then((res)=>{

                this.exampleDataList.content=res.data.data.content
                this.exampleDataList.total=res.data.data.total
                for(let i=0;i<this.exampleDataList.content.length;i++){
                    this.exampleDataList.content[i].runTime=this.dateFormat(this.exampleDataList.content[i].runTime)
                    // this.exampleDataList.content[i].status=this.exampleDataList.content[i].public[0]==='public'?'public':'private'
                }
            })
        },


        loadData(val){
            this.loadDataVisible=true

            this.loadUserTask(1)
            this.loadPublishedData(1)

        },

        expandMyCalcData(el){
            console.log(el)
            let arrow=el.currentTarget
            if(arrow.className.indexOf('transform180')==-1)
            {
                arrow.setAttribute("class","fa fa-caret-square-o-down transform180")
                $('.myCalcData').collapse('show')
            }else{
                arrow.setAttribute("class","fa fa-caret-square-o-down")
                $('.myCalcData').collapse('hide')
            }
        },

        expandPublishedData(el){
            let arrow=el.currentTarget
            if(arrow.className.indexOf('transform180')==-1)
            {
                arrow.setAttribute("class","fa fa-caret-square-o-down transform180")
                $('.publishedData').collapse('show')
            }else{
                arrow.setAttribute("class","fa fa-caret-square-o-down")
                $('.publishedData').collapse('hide')
            }
        },

        filterPublic(value,row){
            return  row.public[0] === 'public'
        },

        handleSelectionChange(){

        },

        showDescription(item){
            console.log(item)
            if (item.description != '') {
                this.showDescriptionVisible = true;
                this.taskDescription = item.description;
            }

        },

        async loadExampleData(id) {
            console.log(id)
            const loading = this.$loading({
                lock: true,
                text: "Loading",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)"
            });

            let{data,code,msg}=await (await fetch("/task/loadPublishedData",{
                method:"post",
                body:id
                }
            )).json()

            if (code == -1 || code==null || code==undefined) {
                loading.close();
                this.$message.error(msg);
                return;
            }

            data.forEach(el=>{ //填入前端变量
                let state = this.info.modelInfo.states.find(state => {
                    return state.name == el.state;
                });

                let event = state.event.find(event => {
                    return event.eventName == el.event;
                });
                if (event == undefined) return;
                this.$set(event, "tag", el.tag);
                this.$set(event, "suffix", el.suffix);
                this.$set(event, "url", el.url);
                if(el.children!=undefined){
                    if(el.children.length==1){
                        event.children[0].value=el.children[0].value;
                    }
                    else {
                        for (i = 0; i < el.children.length; i++) {
                            let name=el.children[i].eventName
                            let eventChild = event.children.find(child => {
                                return child.eventName == name;
                            })
                            if(eventChild!=null) {
                                eventChild.value = el.children[i].value;
                            }
                        }
                    }
                }

                }
            )

            loading.close();
            this.loadDataVisible = false
        },

        async loadTest(type) {
            const loading = this.$loading({
                lock: true,
                text: "Loading",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)"
            });
            let body = {
                oid: this.oid,
                host: this.info.dxInfo.dxIP,
                port: this.info.dxInfo.dxPort,
                type: this.info.dxInfo.dxType,
                userName: this.info.userInfo.userName
            };
            let {data, code, msg} = await (await fetch("/task/loadTestData/", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })).json();

            if (code == -1 || code == null || code == undefined) {
                loading.close();
                this.$message.error(msg);
                return;
            }
            console.log(data)
            data.forEach(el => {
                let stateId = el.stateId;
                let eventName = el.event;
                let state = this.info.modelInfo.states.find(state => {
                    return state.Id == stateId;
                });
                if (state == undefined) return;
                let event = state.event.find(event => {
                    return event.eventName == eventName;
                });
                if (event == undefined) return;
                this.$set(event, "tag", el.tag);
                this.$set(event, "suffix", el.suffix);
                this.$set(event, "url", el.url);
                if(el.children.length>0){
                    if(el.children.length==1){
                        event.children[0].value=el.children[0].value;
                    }
                    else {
                        for (i = 0; i < el.children.length; i++) {
                            let name=el.children[i].eventName
                            let eventChild = event.children.find(child => {
                                return child.eventName == name;
                            })
                            if(eventChild!=null) {
                                eventChild.value = el.children[i].value;
                            }
                        }
                    }
                }


            });
            loading.close();
            this.loadDataVisible = false
        },

        goPersonCenter(oid) {
            window.open("/user/" + oid);
        },

        download(event) {
            //下载接口
            if (event.url != undefined) {
                this.eventChoosing = event;
                window.open("/dispatchRequest/download?url=" + this.eventChoosing.url);
            }
            else {
                this.$message.error("No data can be downloaded.");
            }
        },
        upload(event) {
            //上传接口
            this.eventChoosing = event;
            $("#uploadInputData").click();
        },
        beforeRemove(file) {
            return this.$confirm(`确定移除 ${file.name}？`);
        },
        onSuccess({data}) {
            let {tag, suffix, url} = data;
            this.showUpload = false;
            this.eventChoosing.tag = tag;
            this.eventChoosing.suffix = suffix;
            this.eventChoosing.url = url;
            this.$refs.upload.clearFiles();
            $("#eventInp_" + this.eventChoosing.eventId).val(tag + "." + suffix);
            $("#download_" + this.eventChoosing.eventId).css("display", "block");
        },

        myDataClick(index) {
            this.dataChosenIndex = index;
            this.pathShown = [];
            this.downloadDataSet = [];
            this.downloadDataSetName = [];
            this.getFilePackage()
        },


        async checkPersonData(event) {
            if (this.first == true) {
                let d = await this.getTableData(0);
                this.dataFromDataContainer = d.content;
                this.total = d.total;
                this.first = false;
            }
            this.showDataChose = true;
            this.getUserTaskInfo()
            this.getFilePackage()

            this.eventChoosing = event;//此处把页面上的event与eventChoosing绑定
        },

        selectDataFromPersonal() {
            if (this.currentDataUrl != "") {
                this.showDataChose = false;
                console.log(this.eventChoosing, this.downloadDataSetName)
                this.eventChoosing.tag = this.downloadDataSetName[0].name;
                this.eventChoosing.suffix = this.downloadDataSetName[0].suffix;
                this.eventChoosing.url = this.downloadDataSetName[0].url;
            }
            else {
                this.$message("Please select data first!")
            }

        },

        async handleCurrentChange(val) {
            let d = await this.getTableData(val - 1);
            this.dataFromDataContainer = d.content;
        },
        async getTableData(page) {
            this.tableLoading = true;
            let {data} = await (await fetch(
                "/dispatchRequest/getUserRelatedDataFromDataContainer/?page=" +
                page +
                "&pageSize=10&" +
                "authorName=" +
                this.info.userInfo.userName
            )).json();
            this.tableLoading = false;

            return {
                total: data.totalElements,
                content: data.content
            };
        },

        getPackageContent($event, eval, key) {
            clearTimeout(this.clickTimeout)
            if (eval.package === false)
                return
            let id = eval.id;
            this.fatherIndex = this.myFileShown[key].id;
            this.pathShown.push(this.myFileShown[key])
            if (this.myFileShown[key].children.length != 0)
                this.myFileShown = this.myFileShown[key].children;
            else
                this.myFileShown = [];

            this.renameIndex = '';
            console.log(this.myFileShown)
            // console.log(this.myFileShown.length)
            // console.log(this.fatherIndex)

        },

        getFilePackage() {
            axios.get("/user/getFolderAndFile", {})
                .then(res => {
                    let json = res.data;
                    if (json.code == -1) {
                        alert("Please login first!")
                        window.sessionStorage.setItem("history", window.location.href);
                        window.location.href = "/user/login"
                    }
                    else {
                        this.myFile = res.data.data[0].children;
                        console.log(this.myFile)
                        this.myFileShown = this.myFile;
                    }


                });
        },

        //回到上一层目录
        backToFather() {
            // if(this.myFileShown.length==0||this.fatherIndex!=0) {
            //     this.findFather(this.myFile)
            //     this.fatherIndex=this.myFileShown[0].father;
            //     console.log()
            // }else if(this.fatherIndex==0)
            //     this.myFileShown=this.myFile;
            this.pathShown.pop(this.pathShown.length - 1)
            $('.fa-arrow-left').animate({marginLeft: '-6px'}, 170)
            let allFolder = [];
            allFolder.children = this.myFile;
            this.findFather(this.myFile, allFolder)
            console.log(this.myFileShown)
            this.fatherIndex = this.myFileShown[0].father;
            $('.fa-arrow-left').animate({marginLeft: '0'}, 170)
        },

        findFather(file, father) {
            if (this.fatherIndex === '0')
                this.myFileShown = this.myFile;
            for (let i = 0; i < file.length; i++) {
                if (file[i].id === this.fatherIndex) {
                    this.myFileShown = father.children;
                    console.log(this.myFileShown)
                    return;
                } else {
                    this.findFather(file[i].children, file[i])
                }
            }
        },

        refreshPackage(event, index) {

            let paths = []
            if (index == 1) {
                let i = this.pathShown.length - 1;
                while (i >= 0) {
                    paths.push(this.pathShown[i].id);
                    i--;
                }
                if (paths.length == 0) paths = ['0']

            } else {
                let i = this.selectedPath.length - 1;//selectPath中含有all folder这个不存在的文件夹，循环索引有所区别
                while (i >= 1) {
                    paths.push(this.selectedPath[i].key);
                    i--;
                }
                if (paths.length == 0) paths = ['0']

                this.pathShown = []
                for (i = 1; i < this.selectedPath.length; i++) {
                    this.pathShown.push(this.selectedPath[i].data)
                }


            }

            this.rotatevalue += 180;
            console.log($('.fa-refresh'))
            $('.fa-refresh').css('transform','rotate('+this.rotatevalue+'deg)')

            $.ajax({
                type: "GET",
                url: "/user/getFileByPath",
                data: {
                    paths: paths,
                },
                async: true,
                contentType: "application/x-www-form-urlencoded",
                success: (json) => {
                    if (json.code == -1) {
                        alert("Please login first!")
                        window.sessionStorage.setItem("history", window.location.href);
                        window.location.href = "/user/login"
                    } else {
                        this.myFileShown = json.data.data;
                        this.fatherIndex = this.myFileShown[0].father
                        this.refreshChild(this.myFile);
                        console.log(this.myFileShown)
                    }
                }

            })


        },

        refreshChild(file){
            console.log(this.fatherIndex)
            for(let i=0;i<file.length;i++){
                if(file[i].id===this.fatherIndex){
                    file[i].children=this.myFileShown
                    console.log(this.myFile)
                    return;
                }else{
                    this.refreshChild(file[i].children)
                }
            }
        },

        singleClick($event, eval) {
            if(this.rightMenuShow==true){
                this.rightMenuShow=false;
                return
            }
            clearTimeout(this.clickTimeout)
            var target=$event.currentTarget;
            var eval=eval;
            var that=this
            this.clickTimeout = setTimeout(function (){
                that.getid(target, eval)
            },1)

            this.renameIndex='';

        },

        keywordsSearch() {
            if (this.searchcontent === "") {
                this.getFilePackage()
            } else {
                axios.get('/user/keywordsSearch',{
                    params:{
                        keyword:this.searchcontent
                    }
                }).then((res)=>{
                    let json=res.data;
                    if(json.code==-1){
                        alert("Please login first!")
                        window.sessionStorage.setItem("history", window.location.href);
                        window.location.href="/user/login"
                    }
                    else {
                        this.fileSearchResult=json.data.data;
                        this.myFileShown=this.fileSearchResult
                    }
                })

            }


        },

        async invoke() {
            let loading = this.$loading({
                lock: true,
                text: "Setting parameters...",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)"
            });
            let states = this.info.modelInfo.states;
            for (i = 0; i < states.length; i++) {
                let events = states[i].event;
                for (j = 0; j < events.length; j++) {
                    let event=events[j];
                    if(event.eventType=="response"&&event.optional==false&&event.children!=undefined){
                        for(k=0;k<event.children.length;k++){
                            let child=event.children[k];
                            if(child.value==undefined||child.value.trim()==""){
                                loading.close();
                                this.$message.error("Some input parameters are not set");
                                throw new Error("Some input parameters are not set");
                                return;
                            }
                        }
                    }
                }
            }

            this.createAndUploadParamFile();
            let prepare = setInterval(() => {
                let prepared = true;

                for (i = 0; i < states.length; i++) {
                    let events = states[i].event;
                    for (j = 0; j < events.length; j++) {
                        if (events.eventType=="response"&&events.url == undefined) {
                            prepared = false;
                            break;
                        }
                    }
                    if (!prepared) {
                        break;
                    }
                }

                if (prepared) {
                    clearInterval(prepare);
                    console.log(this.modelInEvent)
                    $(".el-loading-text").text("Model is running, you can check running state and get results in \"User Space\" -> \"Task\"")
                    let json = {
                        oid: this.oid,
                        ip: this.info.taskInfo.ip,
                        port: this.info.taskInfo.port,
                        pid: this.info.taskInfo.pid,
                        inputs: []
                    };

                    try {
                        this.info.modelInfo.states.forEach(state => {
                            let statename = state.name;
                            state.event.forEach(el => {
                                let event = el.eventName;
                                let tag = el.tag;
                                let url = el.url;
                                let suffix = el.suffix;
                                let children=el.children;
                                if (el.eventType == "response") {
                                    if (el.optional) {
                                        if (url === null || url === undefined) {

                                        } else {
                                            json.inputs.push({
                                                statename,
                                                event,
                                                url,
                                                tag,
                                                suffix,
                                                children
                                            });
                                        }
                                    } else {
                                        if (url === null || url === undefined) {
                                            this.$message.error("Some input data are not provided");
                                            throw new Error("Some input data are not provided");
                                        }
                                        json.inputs.push({
                                            statename,
                                            event,
                                            url,
                                            tag,
                                            suffix,
                                            children
                                        });
                                    }
                                }
                            });
                        });
                    } catch (e) {
                        loading.close();
                        return;
                    }


                    $.ajax({
                        url: "/task/invoke",
                        type: "POST",

                        contentType: "application/json",
                        async: false,
                        data: JSON.stringify(json),
                        success: ({data, code, msg})=> {
                            tid = data;

                            if (code == -1) {
                                this.$message.error(msg);
                                window.open("/user/login");
                            }

                            if (code == -2) {
                                this.$message.error(msg);
                                loading.close();
                                return;
                            }
                        }
                    })




                    let interval = setInterval(async () => {
                        let {code, data, msg} = await (await fetch("/task/getResult", {
                            method: "post",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                ip: this.info.taskInfo.ip,
                                port: this.info.taskInfo.port,
                                tid: tid
                            })
                        })).json();
                        if (code === -1) {
                            this.$message.error(msg);
                            clearInterval(interval);
                            loading.close();
                        }
                        if (data.status === -1) {
                            this.$message.error("Some error occured when this model is running!");
                            clearInterval(interval);
                            loading.close();
                        } else if (data.status === 2) {
                            this.$message.success("The model has run successfully!");
                            clearInterval(interval);
                            let outputs = data.outputdata;

                            outputs.forEach(el => {
                                let statename = el.statename;
                                let eventName = el.event;
                                let state = this.info.modelInfo.states.find(state => {
                                    return state.name == statename;
                                });
                                if (state == undefined) return;
                                let event = state.event.find(event => {
                                    return event.eventName == eventName;
                                });
                                if (event == undefined) return;
                                this.$set(event, "tag", el.tag);
                                this.$set(event, "suffix", el.suffix);
                                this.$set(event, "url", el.url);
                            });

                            loading.close();
                        } else {
                        }
                    }, 5000);
                }
            }, 2000)
        },


        selectFromMyData(key, modelInEvent) {
            this.selectDataDialog = true
            this.selectData = []
            this.keyInput = key

            let that = this;
            axios.get("/dataManager/list", {
                params: {
                    author: this.useroid,
                    type: "author"
                }

            })
                .then((res) => {

                    // console.log("oid datas",this.userId,res.data.data)
                    that.userData = res.data.data
                    that.totalNum = res.data.data.totalElements;
                    that.loading = false
                })


            this.modelInEvent = modelInEvent


        },
        currentPage() {

        },

        loadMore(e) {

        },
        selectUserData(item, e) {
            // console.log(e)
            this.$message("you have selected:  " + item.fileName + '.' + item.suffix);
            if (this.selectData.length === 0) {
                let d = {e, item}
                this.selectData.push(d)
                e.target.style.background = 'aliceblue'

            } else {
                let e2 = this.selectData.pop();

                if (e2.e != e) {

                    let d = {e, item}
                    e2.e.target.style.background = '';
                    e.target.style.background = 'aliceblue';
                    this.selectData.push(d)

                }

            }


        },

        showtitle(ev) {
            return ev.fileName + "\n" + "Type:" + ev.suffix;
        },
        getImg(item) {
            let list = []
            if (item.id == 0 || item.package == true)
                return "/static/img/filebrowser/package.png"
            if (item.suffix == 'unknow')
                return "/static/img/filebrowser/unknow.svg"
            return "/static/img/filebrowser/" + item.suffix + ".svg"
        },
        generateId(key) {
            return key;
        },

        //上传
        upload_data_dataManager() {


            if (this.sourceStoreId === '') {
                alert("请先上传数据")
            } else {
                var data = {
                    author: this.userId,

                    fileName: $("#managerFileName").val(),
                    fromWhere: "PORTAL",
                    mdlId: "string",
                    sourceStoreId: this.sourceStoreId,
                    suffix: $("#managerFileSuffix").val(),
                    tags: $("#managerFileTags").tagsinput('items'),
                    type: "OTHER"

                }
                var that = this;
                axios.post("http://172.21.212.64:8082/dataResource", data)
                    .then(res => {
                        if (res.status == 200) {
                            alert("data upload success")

                            that.addAllData()
                            that.close()
                        }
                    });

            }

        },

        //下载
        download_data_dataManager() {

            for (let i = 0; i < this.databrowser.length; i++) {
                if (this.databrowser[i].id === this.dataid) {
                    var item = this.databrowser[i];
                    break;
                }
            }


            if (item != null) {
                let url = "/dataManager/downloadRemote?&sourceStoreId=" + item.sourceStoreId;
                let link = document.createElement('a');
                link.style.display = 'none';
                link.href = url;
                // link.setAttribute(item.fileName,'filename.'+item.suffix)

                document.body.appendChild(link)
                link.click();

            } else {
                this.$message('please select file first!!');
            }


        },
        //删除
        delete_data_dataManager() {

            if (confirm("Are you sure to delete?")) {
                let tha = this
                axios.delete("/dataManager/delete", {
                    params: {
                        id: tha.dataid
                    }
                }).then((res) => {


                    if (res.data.msg === "成功") {
                        //删除双向绑定的数组
                        tha.rightMenuShow = false
                        tha.databrowser = []
                        tha.addAllData()
                        alert("delete successful")

                    }

                })
            } else {
                alert("ok")
            }


        },


        showsearchresult(data) {

            //动态创建DOM节点

            for (let i = 0; i < this.databrowser.length; i++) {
                //匹配查询字段
                if (this.databrowser[i].fileName.toLowerCase().indexOf(data.toLowerCase()) > -1) {
                    //插入查找到的card

                    //card
                    let searchresultcard = document.createElement("div");
                    searchresultcard.classList.add("el-card");
                    searchresultcard.classList.add("dataitemisol");
                    searchresultcard.classList.add("is-never-shadow");
                    searchresultcard.classList.add("sresult");


                    //cardbody
                    let secardbody = document.createElement("div");
                    secardbody.classList.add("el-card__body");
                    //card里添加cardbody
                    searchresultcard.appendChild(secardbody);

                    //el-row1
                    let cardrow1 = document.createElement("div");
                    cardrow1.classList.add("el-row");
                    secardbody.appendChild(cardrow1);

                    //3个div1
                    //div1
                    let div1 = document.createElement("div");
                    div1.classList.add("el-col");
                    div1.classList.add("el-col-6");

                    let text1 = document.createTextNode(" ");
                    div1.appendChild(text1);

                    cardrow1.appendChild(div1)

                    //div2
                    let div2 = document.createElement("div");
                    div2.classList.add("el-col");
                    div2.classList.add("el-col-12");

                    let img = document.createElement("img");
                    img.src = "/static/img/filebrowser/" + this.databrowser[i].suffix + ".svg";

                    img.style.height = '60%';
                    img.style.width = '100%';
                    img.style.marginLeft = '30%';

                    div2.appendChild(img);

                    cardrow1.appendChild(div2)

                    //div3
                    let div3 = document.createElement("div");
                    div3.classList.add("el-col");
                    div3.classList.add("el-col-6");

                    let text2 = document.createTextNode(" ");
                    div3.appendChild(text2);

                    cardrow1.appendChild(div3);


                    //el-row2
                    let cardrow2 = document.createElement("div");
                    cardrow2.classList.add("el-row");
                    secardbody.appendChild(cardrow2);

                    //3个div2
                    //div4
                    let div4 = document.createElement("div");
                    div4.classList.add("el-col");
                    div4.classList.add("el-col-2");

                    let text3 = document.createTextNode(" ");
                    div4.appendChild(text3);

                    cardrow2.appendChild(div4)

                    //div5
                    let div5 = document.createElement("div");
                    div5.classList.add("el-col");
                    div5.classList.add("el-col-20");

                    let p = document.createElement("p");
                    div5.appendChild(p);

                    let filenameandtype = document.createTextNode(this.databrowser[i].fileName + '.' + this.databrowser[i].suffix);
                    p.appendChild(filenameandtype)

                    cardrow2.appendChild(div5)

                    //div6
                    let div6 = document.createElement("div");
                    div6.classList.add("el-col");
                    div6.classList.add("el-col-20");

                    let text4 = document.createTextNode(" ");
                    div6.appendChild(text4);

                    cardrow2.appendChild(div6)

                    //往contents里添加card
                    document.getElementById("browsercont").appendChild(searchresultcard);

                    //DOM2级事件绑定

                    // searchresultcard.addEventListener('click',()=>{
                    //    //点击赋值id
                    //     this.dataid=i;
                    // });
                    searchresultcard.click(function () {
                        this.dataid = this.databrowser[i].id;
                    })

                }
            }
        },

        category(data) {

            for (let j = 0; j < data.length; j++) {
                for (let i = 0; i < this.databrowser.length; i++) {
                    //匹配查询字段
                    if (this.databrowser[i].suffix.toLowerCase().indexOf(data[j].toLowerCase()) > -1) {
                        //插入查找到的card

                        //card
                        let searchresultcard = document.createElement("div");
                        searchresultcard.classList.add("el-card");
                        searchresultcard.classList.add("dataitemisol");
                        searchresultcard.classList.add("is-never-shadow");
                        searchresultcard.classList.add("sresult");


                        //cardbody
                        let secardbody = document.createElement("div");
                        secardbody.classList.add("el-card__body");
                        //card里添加cardbody
                        searchresultcard.appendChild(secardbody);

                        //el-row1
                        let cardrow1 = document.createElement("div");
                        cardrow1.classList.add("el-row");
                        secardbody.appendChild(cardrow1);

                        //3个div1
                        //div1
                        let div1 = document.createElement("div");
                        div1.classList.add("el-col");
                        div1.classList.add("el-col-6");

                        let text1 = document.createTextNode(" ");
                        div1.appendChild(text1);

                        cardrow1.appendChild(div1)

                        //div2
                        let div2 = document.createElement("div");
                        div2.classList.add("el-col");
                        div2.classList.add("el-col-12");

                        let img = document.createElement("img");
                        img.src = "/static/img/filebrowser/" + this.databrowser[i].suffix + ".svg";

                        img.style.height = '60%';
                        img.style.width = '100%';
                        img.style.marginLeft = '30%';

                        div2.appendChild(img);

                        cardrow1.appendChild(div2)

                        //div3
                        let div3 = document.createElement("div");
                        div3.classList.add("el-col");
                        div3.classList.add("el-col-6");

                        let text2 = document.createTextNode(" ");
                        div3.appendChild(text2);

                        cardrow1.appendChild(div3);


                        //el-row2
                        let cardrow2 = document.createElement("div");
                        cardrow2.classList.add("el-row");
                        secardbody.appendChild(cardrow2);

                        //3个div2
                        //div4
                        let div4 = document.createElement("div");
                        div4.classList.add("el-col");
                        div4.classList.add("el-col-2");

                        let text3 = document.createTextNode(" ");
                        div4.appendChild(text3);

                        cardrow2.appendChild(div4)

                        //div5
                        let div5 = document.createElement("div");
                        div5.classList.add("el-col");
                        div5.classList.add("el-col-20");

                        let p = document.createElement("p");
                        div5.appendChild(p);

                        let filenameandtype = document.createTextNode(this.databrowser[i].fileName + '.' + this.databrowser[i].suffix);
                        p.appendChild(filenameandtype)

                        cardrow2.appendChild(div5)

                        //div6
                        let div6 = document.createElement("div");
                        div6.classList.add("el-col");
                        div6.classList.add("el-col-20");

                        let text4 = document.createTextNode(" ");
                        div6.appendChild(text4);

                        cardrow2.appendChild(div6)

                        //往contents里添加card
                        document.getElementById("browsercont").appendChild(searchresultcard);

                        //DOM2级事件绑定

                        // searchresultcard.addEventListener('click',()=>{
                        //    //点击赋值id
                        //     this.dataid=i;
                        // });
                        searchresultcard.click(function () {
                            this.dataid = this.databrowser[i].id;
                        })

                    }
                }
            }

        },

        getid($event, eval) {
            console.log(eval.id)
            this.dataid = eval.id;

            $event.closest('.el-card').className = "el-card dataitemisol clickdataitem"

            //再次点击取消选择

            if (this.downloadDataSet.indexOf(eval) > -1) {
                for (var i = 0; i < this.downloadDataSet.length; i++) {
                    if (this.downloadDataSet[i] === eval) {
                        //删除
                        this.downloadDataSet.splice(i, 1)
                        this.downloadDataSetName.splice(i, 1)
                        break
                    }
                }

            } else {
                this.downloadDataSet = []
                this.downloadDataSetName = []
                this.downloadDataSet.push(eval)
                let obj = {
                    name: eval.label,
                    suffix: eval.suffix,
                    package: eval.package,
                    url: eval.url
                }
                this.downloadDataSetName.push(obj)
            }

            if (eval.taskId != null) {
                this.detailsIndex = 2
                this.getOneOfUserTasks(eval.taskId);
            }
        },


        getOneOfUserTasks(taskId) {
            $.ajax({
                type: 'GET',
                url: "/task/getTaskByTaskId",
                // contentType:'application/json',

                data:
                    {
                        id: taskId,
                    },
                // JSON.stringify(obj),
                cache: false,
                async: true,
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success: (json) => {

                    if (json.code != 0) {
                        alert("Please login first!");
                        window.location.href = "/user/login";
                    } else {
                        setTimeout(() => {
                            const data = json.data;
                            this.resourceLoad = false;
                            // this.researchItems = data.list;
                            this.packageContent = data;
                            console.log(this.packageContent)
                        }, 100)


                    }
                }
            })
        },

        addDataClass($event, item) {
            this.rightMenuShow = false


            if (this.downloadDataSet.indexOf(item) < 0) {
                $event.currentTarget.className = "el-card dataitemisol dataitemhover"
            }

            this.dataid = item.id


        },

        removeClass($event, item) {


            if (this.downloadDataSet.indexOf(item) > -1) {
                $event.currentTarget.className = "el-card dataitemisol clickdataitem"
            } else {
                $event.currentTarget.className = "el-card dataitemisol"
            }


        },

        //右键菜单

        rightMenu(e) {
            e.preventDefault();

            e.currentTarget.className = "el-card dataitemisol clickdataitem"


            var dom = document.getElementsByClassName("browsermenu");

            console.log(e)
            dom[0].style.top = e.pageY - 100 + "px"
            // 125 > window.innerHeight
            //     ? `${window.innerHeight - 127}px` : `${e.pageY}px`;
            dom[0].style.left = e.pageX - 200 + "px";

            this.rightMenuShow = true


        },

        openWzhRightMenu(e) {
            e.preventDefault();

            e.currentTarget.className = "el-card dataitemisol clickdataitem"
            console.log(e)

            var dom = document.getElementsByClassName("wzhRightMenu");

            dom[0].style.top = e.pageY - 250 + "px"
            dom[0].style.left = e.pageX - 230 + "px";
            console.log(e.style)
            $('.wzhRightMenu').animate({height: '120'}, 150);
        },

        myDataClick(index) {
            this.dataChosenIndex = index;
        },

        outputDataClick(index) {
            this.dataChosenIndex = index;
        },

        userDownload() {
            //todo 依据数组downloadDataSet批量下载

            let sourceId = new Array()

            for (let i = 0; i < this.downloadDataSet.length; i++) {
                sourceId.push(this.downloadDataSet[i].sourceStoreId)
            }


            if (this.downloadDataSet.length > 0) {

                const keys = sourceId.map(_ => `sourceStoreId=${_}`).join('&');
                let url = "/dataManager/downloadSomeRemote?" + keys;
                let link = document.createElement('a');
                link.style.display = 'none';
                link.href = url;
                // link.setAttribute(item.fileName,'filename.'+item.suffix)

                document.body.appendChild(link)
                link.click();

            } else {
                alert("please select first!!")
            }


        },

        getTree() {
            return this.tree;
        },


        submitForm(formName) {
            //包含上传的文件信息和服务端返回的所有信息都在这个对象里
            this.$refs.upload.uploadFiles
        },

        confirmSelect() {
            if (this.selectData.length == 0) {
                this.$message("you have selected no data")
            } else {
                let da = this.selectData.pop()

                let key = this.keyInput
                // $('#datainput'+key)[0].value=da.item.fileName

                this.selectDataDialog = false

                //todo 拼接url
                this.modelInEvent.url = "http://172.21.212.64:8082/dataResource/getResource?sourceStoreId=" + da.item.sourceStoreId
                this.modelInEvent.tag = da.item.fileName

            }


            this.selectData = []


        },

    },

    async mounted() {

        var tha = this
        axios.get("/dataItem/createTree")
            .then(res => {
                tha.tObj = res.data;
                for (var e in tha.tObj) {
                    var a = {
                        key: e,
                        value: tha.tObj[e]
                    }
                    if (e != 'Data Resouces Hubs') {
                        tha.categoryTree.push(a);
                    }


                }

            })

        this.relatedDataItem();


        this.introHeight = $('.introContent').attr('height');

        console.log(this.introHeight)
        let ids = window.location.href.split("/");
        let id = ids[ids.length - 1];
        this.oid = id;
        let {data} = await (await fetch("/task/TaskInit/" + id)).json();
        if (data == null || data == undefined) {
            alert("Initialization error!")
        }
        let states = data.modelInfo.states;
        for (i = 0; i < states.length; i++) {
            let state = states[i];
            for (j = 0; j < state.event.length; j++) {
                if(state.event[j].data!=undefined&&state.event[j].eventType=="response") {
                    let nodes = state.event[j].data[0].nodes;
                    let refName=state.event[j].data[0].text.toLowerCase();
                    if (state.event[j].data[0].externalId != undefined) {
                        state.event[j].externalId = state.event[j].data[0].externalId;
                    }

                    if (nodes != undefined&&refName!="grid"&&refName!="table") {
                        let children = [];
                        for (k = 0; k < nodes.length; k++) {
                            let node = nodes[k];
                            let child = {};
                            child.eventId = node.text;
                            child.eventName = node.text;
                            child.eventDesc = node.desc;
                            child.eventType = node.dataType;

                            child.child = true;
                            children.push(child);
                        }
                        data.modelInfo.states[i].event[j].children = children;
                    }
                    else{
                        data.modelInfo.states[i].event[j].data[0].nodes=undefined;
                    }

                }
            }
        }

        this.events = data.modelInfo.states[0].event;
        console.log(this.events)
        console.log(this.tableData)
        this.info = data;
        console.log(this.info);


        //get login user info
        let that=this
        axios.get("/user/load")
            .then((res)=>{
                if(res.status==200){
                    that.useroid=res.data.oid
                }

            })

        window.addEventListener('scroll',this.initSize);
        window.addEventListener('resize',this.initSize);

        $("#uploadInputData").change(()=> {
            this.currentFile = $('#uploadInputData')[0].files[0];
            //this.uploadToDataContainer(file);

        })

        /**
         * 张硕
         * 2019.11.21
         * 模型运行的图形界面
         */

        let count = 0;
        $('#workFlow').click(function () {
            $(".mxWindow").remove();
            if (count == 0) {
                count++;
                setTimeout(function () {
                    var diagram = new OGMSDiagram();
                    diagram.init($('#ogmsDiagramContainer'),
                        {
                            width: '100%',       //! Width of panel
                            // height: '100%',       //! Height of panel
                            height: 650,       //! Height of panel
                            enabled: false      //! Edit enabled
                        },
                        {
                            x: 500,            //! X postion of state information window
                            y: $(window).scrollTop() + 50,              //! Y postion of state information window
                            width: 520,         //! Width of state information window
                            height: 650         //! Height of state information window
                        },
                        {
                            x: 1000,           //! X postion of data reference information window
                            y: $(window).scrollTop() + 50,             //! Y postion of data reference information window
                            width: 300,         //! Width of data reference information window
                            height: 400         //! Height of data reference information window
                        },
                        '/static/js/mxGraph/images/modelState.png',    //! state IMG
                        '/static/js/mxGraph/images/grid.gif',          //! Grid IMG
                        '/static/js/mxGraph/images/connector.gif',     //! Connection center IMG
                        false                       //! Debug button
                    );


                    var behavior = {};
                    behavior.states = that.info.modelInfo.states;
                    behavior.dataRef = that.info.modelInfo.dataRefs;
                    behavior.transition = [];

                    that.loadjson = JSON.stringify(behavior).replace(new RegExp("\"event\":", "gm"), "\"events\":");
                    that.loadjson = that.loadjson.replace(new RegExp("\"desc\":", "gm"), "\"description\":");
                    that.loadjson = that.loadjson.replace(new RegExp("\"Id\":", "gm"), "\"id\":");
                    that.loadjson = that.loadjson.replace(new RegExp("\"eventId\":", "gm"), "\"id\":");
                    that.loadjson = that.loadjson.replace(new RegExp("\"eventName\":", "gm"), "\"name\":");
                    that.loadjson = that.loadjson.replace(new RegExp("\"eventType\":", "gm"), "\"type\":");
                    that.loadjson = that.loadjson.replace(new RegExp("\"eventDesc\":", "gm"), "\"description\":");
                    that.loadjson = that.loadjson.replace(new RegExp("\"optional\":", "gm"), "\"option\":");
                    that.loadjson = that.loadjson.replace(new RegExp("\"data\":", "gm"), "\"dataDes\":");
                    that.loadjson = that.loadjson.replace(new RegExp("\"dataType\":", "gm"), "\"type\":");
                    that.loadjson = that.loadjson.replace(new RegExp("\"text\":", "gm"), "\"name\":");
                    diagram.loadJSON(that.loadjson);
                    console.log(JSON.parse(that.loadjson))

                    diagram.onStatedbClick(function (state) {
                        diagram.showStateWin({
                            x: 1050,
                            y: 260,
                        }, {
                            width: 500,
                            height: 500
                        });

                    });
                }, 0.1);
            }
        });
        $('#classic').click(function () {
            $(".mxWindow").remove();
            count = 0;
        });
        $('#semantics').click(function () {
            $(".mxWindow").remove();
            count = 0;
        });

        $(document).on("click", ".eventBtn", function (e) {
            var event_id = e.currentTarget.id;
            var start = event_id.search('_');
            var eventId = event_id.slice(start + 1);
            var btnName = event_id.slice(0, start);

            var find = false;
            for (var i = 0; i < that.info.modelInfo.states.length; i++) {
                var state = that.info.modelInfo.states[i];
                for (var j = 0; j < state.event.length; j++) {
                    var event = state.event[j];
                    if (eventId == event.eventId) {
                        switch (btnName) {
                            case 'select':
                                that.selectFromDataItem(event);
                                break;
                            case 'upload':
                                that.upload(event);
                                break;
                            case 'check':
                                that.checkPersonData(event);
                                break;
                            case 'download':
                                that.download(event);
                                break;
                        }
                        find = true;
                        break;
                    }
                }
                if (find == true) {
                    break;
                }
            }
        }.bind(this));

        /**
         * 张硕
         * 2019.11.22
         * Event的点击事件，作用是将tab中的input文件与vue中的info属性相关联
         */
        $(document).on('click', '.eventTab', function (e) {
                var href = e.currentTarget.href;
                var start = href.search('#');
                var eventId = href.slice(start + 7);

                var find = false;
                for (var i = 0; i < that.info.modelInfo.states.length; i++) {
                    var state = that.info.modelInfo.states[i];
                    for (var j = 0; j < state.event.length; j++) {
                        var event = state.event[j];
                        if (eventId == event.eventId) {
                            if(event.eventType == "response"&&event.children!=undefined){
                                for(k=0;k<event.children.length;k++){
                                    let child=event.children[k];
                                    $("#eventInp_"+child.eventName).val(child.value);
                                }
                            }
                            else if (event.eventType == "response" && event.tag != undefined) {
                                $("#eventInp_" + eventId).val(event.tag + "." + event.suffix);
                            } else if (event.eventType == "response") {
                                $("#download_" + eventId).css("display", "none");
                            } else if (event.eventType != "response" && event.tag != undefined) {
                                $("#eventInp_" + eventId).val(event.tag + "." + event.suffix);
                                $("#eventInp_" + eventId).css("width", "90%");
                                $("#select_" + eventId).css("display", "none");
                                $("#upload_" + eventId).css("display", "none");
                                $("#check_" + eventId).css("display", "none");
                            } else {
                                $("#inputGroup_" + eventId).css("display", "none");
                            }
                            find = true;
                            break;
                        }
                    }
                    if (find == true) {
                        break;
                    }
                }

                // that.info.modelInfo.states;
                // $("#eventInp_ + eventId").value =

            }.bind(this)
        );

        $(document).on('keyup','.StateWindowEvent',(e)=>{
            let states=this.info.modelInfo.states;
            for(i=0;i<states.length;i++){
                let events=states[i].event;
                for(j=0;j<events.length;j++){
                    let event=events[j];
                    if(event.eventId==e.target.dataset.parent){
                        for(k=0;k<event.children.length;k++){
                            let child=event.children[k];
                            if(child.eventName==e.target.name){
                                this.info.modelInfo.states[i].event[j].children[k].value=e.target.value;
                                break;
                            }
                        }
                    }
                }
            }
        })
    },

    destory(){
        window.removeEventListener('scroll',this.initSize);
        window.removeEventListener('resize',this.initSize);
    }


});

$(function () {
    console.log('ha ha')
    $(window).resize(function () {
        let introHeaderHeight = $('.introHeader').css('width')
        console.log(introHeaderHeight)
        if (parseInt(introHeaderHeight) < 240) {
            $('.image').css('display', 'none')
        } else {
            $('.image').css('display', 'block')
        }
    })

    $('#browsercont2').click((e) => {
        $('.wzhRightMenu').animate({height: '0'}, 50);
        console.log($('#browsercont'))

    })

    $("#refreshPackageBtn").click(
        function () {
            value += 180;
            $('.fa-refresh').rotate({animateTo: value})
        }
    );


    $('document').on('onclick', '.backFatherBtn', () => {
        console.log('11')
        $('.fa-arrow-left').animate({marginLeft: '-6px'}, 170)
        $('.fa-arrow-left').animate({marginLeft: '0'}, 170)
    });


});
