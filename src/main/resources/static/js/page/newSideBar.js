Vue.component('headSideBar', {
    template: '#headSideBar',
    props: ['userInfoinParent','curindexParent'],

    data() {
        return {
            curIndex:1,
            itemIndex: 1,

            //
            userInfo:{

            },
        }
    },

    watch: {
        curindexParent: {
            handler() {
                this.curIndex = this.curindexParent
                console.log('parent change')
            },
            immediate: true
        }
    },

    methods:{
        changeRter(index){
            this.curIndex = index;
            var urls={
                1:'/user/userSpace#/',
                2:'/user/userSpace#/model',
                3:'/user/userSpace#/data',
                4:'/user/userSpace#/server',
                5:'/user/userSpace#/task',
                6:'/user/userSpace#/community',
                7:'/user/userSpace#/userTheme',
                8:'/user/userSpace#/account',
                9:'/user/userSpace#/feedback',
            }

            this.setSession('curIndex',index)
            window.location.href=urls[index]

        },

        setSession(name, value) {
            window.sessionStorage.setItem(name, value);
            // this.editOid = sessionStorage.getItem('editItemOid');
        },

        getUserInfo() {
            axios.get('/user/getLoginUser').then(
                res => {
                    if(res.data.code==0){
                        this.userInfo = res.data.data
                        let orgs = this.userInfo.organizations;

                        if (orgs.length != 0) {
                            this.userInfo.orgStr = orgs[0];
                            for (i = 1; i < orgs.length; i++) {
                                this.userInfo.orgStr += ", " + orgs[i];
                            }
                        }

                        let sas = this.userInfo.subjectAreas;
                        if (sas != null && sas.length != 0) {
                            this.userInfo.saStr = sas[0];
                            for (i = 1; i < sas.length; i++) {
                                this.userInfo.saStr += ", " + sas[i];
                            }
                        }


                        this.load = false;
                    }

                }
            )
        },

        getThemeMessage(){
            $.ajax({
                url: "/theme/getoid",
                async: false,
                success:(data)=>{
                    this.oid = data;
                }
            })
            window.location.href = "/theme/getmessagepage/" + this.oid;
        }
    },

    created(){
        this.getUserInfo()
    },

    mounted(){
        let that= this;
        //用于消息判断
        $(document).ready(function () {
            $.ajax({
                url:"/theme/getedit",
                async:false,
                type:"GET",
                success:(json)=>{
                    console.log(json);

                    for (let i=0;i<json.length;i++) {
                        for (let k = 0; k < 4; k++) {
                            let type;
                            switch (k) {
                                case 0:
                                    type = json[i].subDetails;
                                    break;
                                case 1:
                                    type = json[i].subClassInfos;
                                    break;
                                case 2:
                                    type = json[i].subDataInfos;
                                    break;
                                case 3:
                                    type = json[i].subApplications;
                                    break;

                            }
                            if (type != null && type.length > 0) {
                                //需要往数组中放时先push好数组
                                that.tableData.push({
                                    info: [],
                                    model: [],
                                    data: [],
                                    application: []
                                });
                                for (let j = 0; j < type.length; j++) {
                                    if (k == 0) {
                                        that.tableData[1].info.push({
                                            uid: type[j].uid,
                                            time: type[j].time,
                                            theme: json[i].themename
                                        })
                                    }else if (k == 1){
                                        that.tableData[1].model.push({
                                            uid: type[j].uid,
                                            time: type[j].time,
                                            theme: json[i].themename
                                        })
                                    }else if (k == 2){
                                        that.tableData[1].data.push({
                                            uid: type[j].uid,
                                            time: type[j].time,
                                            theme: json[i].themename
                                        })
                                    } else if (k == 3){
                                        that.tableData[1].application.push({
                                            uid: type[j].uid,
                                            time: type[j].time,
                                            theme: json[i].themename
                                        })
                                    }
                                }
                            }
                        }
                    }

                    //此处判断最终tableData内是否有值，有值则显示消息红点，无值则不显示红点
                    if (that.tableData.length==1){
                        $(".is-dot").hide();
                    } else {
                        if (that.tableData[1].info.length != 0 || that.tableData[1].model.length != 0 || that.tableData[1].data.length != 0 || that.tableData[1].application.length != 0) {
                            $(".is-dot").show();
                        } else {
                            $(".is-dot").hide();
                        }
                    }
                }
            })
        })

    },

})