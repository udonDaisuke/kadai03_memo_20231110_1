// *----------------------------------------------------------
// *  function   
// *----------------------------------------------------------
// side-menu
function addShowClass(target){
    if($(target).hasClass("show")==false){
        // if default class name
            $(target).addClass("show");
        }else{
        // if show added into class
            $(target).removeClass("show");
        };    
};
// window-opacity
function changeOpacity(target,transition_time="0.5s",target_opacity=0, effect=0){
    $(target).css("transition", `${transition_time} ease-in-out`)
    if (effect==0){
        $(target).css("background", "white")
    };

    $(target).css("opacity", `${target_opacity}`)
    if (target_opacity==0){
        $(target).css("z-index","-99")

    }else{
        $(target).css("z-index","99")
    };

};

function changeContents(target, transition_time="0.5s", showhide="show", 
                        html_str="", css_str="", css_child = ""){
    $(target).empty();
    $(target).html(html_str);
    $(target).css(css_str);
    // $($(target).innerHTML),css(css_child);
    console.log($(target).children("*"));
    $($(target).children("*")).css(css_child);
    if(showhide == "show"){
        changeOpacity(target,transition_time,1,1);
    }else{
        changeOpacity(target,transition_time,0);
    };
    
};

function mordalAddGoal(mode="Newly Start"){
    if (mode == "Newly Start" || "Button"){
        console.log(mode)
        // initialize strage
        if(mode == "Newly Start"){
            localStorage.removeItem("goal")
            localStorage.removeItem("task")
        };
        $(".mordal-overlay").addClass("goal_set");

        $(".mordal-overlay").empty();
        target = ".mordal-overlay";
        addhtml = "mordal-wiin"
        const html_str =`
        <div class=mordal-win-goal">
            <p class="mordal-msg">Set new goal...</p>
            <textarea id = "new-goal" cols="40" row="2" placeholder="Enter your goal"></textarea>        
            <p class="mordal-btn" id="add-goal">DONE</p>        
        </div>
        `;
        css_target={
            display: "block", content: "", background: "#08304d", width: "100%",
            height: "100%", overflow: "hidden", position: "fixed", "z-index": "3",
            top: "50px", width: "100%", height: "100%", overflow: "hidden"
        };
        css_child={
            position: "fixed", background: "white", boxShadow: "inset 0px 0px 7px  #264d5788",
            paddingTop: "5px", paddingBottom: "5px", top: "20%", left: "25%", width: "50%",
            height: "150px", display: "flex", flexDirection: "column", justifyContent: "center",
            alignItems: "center",gap: "20px", borderRadius: "15px","z-index": "2"
            }
        changeContents(target, "0.6s",  "show",html_str, css_target, css_child)    
        $("textarea").focus();
    };
    $("#add-goal").on("click", function(e){
        let [max_i, goal_value] = add_goal_item();
        // let goal_id += 1
        // let 
        changeOpacity(target_element,"0.7s");
        console.log("ssssssssss",goal_value)

        console.log("ssssss",max_i)

        $(".mordal-overlay").empty();
        target = ".mordal-overlay";
        addhtml = "mordal-wiin"
        let delimeter ="|/|"
        // goal_id=0;
        taskid = 0;
        const html_str =`
        <div class=mordal-win-task">
            <p class="mordal-msg">Current goal</p>
            <p class="mordal-msg"><b>『${goal_value.split(delimeter)[max_i]}』</b></p>
            <ul class = "mordal-task-list">
                <li class ="mordal-task-li" id = "mordal-task-${taskid}">
                    <textarea id = "new-task-what" cols="20" row="1" placeholder="WHAT"></textarea>
                    <textarea id = "new-task-howmuch" cols="20" row="1" placeholder="HOW MUCH *separate UNIT with '_'"></textarea>
                    <textarea id = "new-task-bywhen" cols="12" row="1" placeholder="BY WHEN *yyyy/mm/dd"></textarea>
                </li>        
            <p class="mordal-btn" id="add-more-task"><span>&#10010;</span>Add next task</p>        
            <p class="mordal-btn" id="add-task-done">DONE</p>        
        </div>
        `;
        css_target={
            display: "block", content: "", background: "#08304d", width: "100%",
            height: "100%", overflow: "hidden", position: "fixed", "z-index": "3",
            top: "50px", width: "100%", height: "100%", overflow: "hidden"
        };
        css_child={
            position: "fixed", background: "white", boxShadow: "inset 0px 0px 7px  #264d5788",
            paddingTop: "5px", paddingBottom: "5px", top: "20%", left: "25%", width: "50%",
            height: "250px", display: "flex", flexDirection: "column", justifyContent: "center",
            alignItems: "center",gap: "20px", borderRadius: "15px","z-index": "2"
            }
        changeContents(target, "10s",  "show",html_str, css_target, css_child)
        // 新たなゴール
        delimeter_flag = true; 
    });

    //生成後のevent定義時は通常通りのセレクタで動くが、この階層ではないので以下のように記載する
    $(document).on("click","#add-more-task",function(e){
        e.stopImmediatePropagation()
        console.log("sss1",e)
        add_task_item(delimeter_flag)
        delimeter_flag = false;
        $("#new-task-what").val("")
        $("#new-task-howmuch").val("")
        $("#new-task-bywhen").val("")
    });

    $(document).on("click","#add-task-done",function(e){
        console.log("sss2",e)
        e.stopImmediatePropagation()

        add_task_item(delimeter_flag)
        changeOpacity(target_element,"0.7s");
        task_list_sync()
        delimeter_flag = false;
        sim();
    });

};





// *----------------------------------------------------------
// *----------------------------------------------------------

// !side-menu event
// click side menu open 
const clicked_add_show = ".open-task";
const target_add_show = ".side-list";
console.log($(clicked_add_show)[0]); 
$(clicked_add_show).on("click",()=>{addShowClass(target_add_show)});

// !mordal win
let delimeter_flag = false;
const target_element = ".mordal-overlay";
// const target_opacity = 0;
const transition_time ="1s"

$(".mordal-btn").on("click",function(e){
    e.stopImmediatePropagation()
    changeOpacity(target_element,"0.7s");
    // let mode = $(this).text();
    if($(this).text()=="Newly Start"){mordalAddGoal()};
    if($(this).text()=="Resume"){
        changeOpacity(target_element,"0.7s");
        task_list_sync();
    };


    // if (mode == "Newly Start"){
    //     // initialize strage
    //     localStorage.removeItem("goal")
    //     localStorage.removeItem("task")

    //     $(".mordal-overlay").addClass("goal_set");

    //     $(".mordal-overlay").empty();
    //     target = ".mordal-overlay";
    //     addhtml = "mordal-wiin"
    //     const html_str =`
    //     <div class=mordal-win-goal">
    //         <p class="mordal-msg">Set new goal...</p>
    //         <textarea id = "new-goal" cols="40" row="2" placeholder="Enter your goal"></textarea>        
    //         <p class="mordal-btn" id="add-goal">DONE</p>        
    //     </div>
    //     `;
    //     css_target={
    //         display: "block", content: "", background: "#08304d", width: "100%",
    //         height: "100%", overflow: "hidden", position: "fixed", "z-index": "3",
    //         top: "50px", width: "100%", height: "100%", overflow: "hidden"
    //     };
    //     css_child={
    //         position: "fixed", background: "white", boxShadow: "inset 0px 0px 7px  #264d5788",
    //         paddingTop: "5px", paddingBottom: "5px", top: "20%", left: "25%", width: "50%",
    //         height: "150px", display: "flex", flexDirection: "column", justifyContent: "center",
    //         alignItems: "center",gap: "20px", borderRadius: "15px","z-index": "2"
    //         }
    //     changeContents(target, "10s",  "show",html_str, css_target, css_child)    
    //     $("textarea").focus();
    // };
    // // let value = localStorage.getItem("goal")

    // $("#add-goal").on("click", function(){
    //     let goal_value = add_goal_item();
    //     changeOpacity(target_element,"0.7s");
    //     console.log(goal_value)

    //     console.log(`${$("#new-goal").val()}`)

    //     $(".mordal-overlay").empty();
    //     target = ".mordal-overlay";
    //     addhtml = "mordal-wiin"
    //     let delimeter ="|/|"
    //     goal_id=0;
    //     taskid = 0;
    //     const html_str =`
    //     <div class=mordal-win-task">
    //         <p class="mordal-msg">Current goal</p>
    //         <p class="mordal-msg"><b>『${goal_value.split(delimeter)[goal_id]}』</b></p>
    //         <ul class = "mordal-task-list">
    //             <li class ="mordal-task-li" id = "mordal-task-${taskid}">
    //                 <textarea id = "new-task-what" cols="20" row="1" placeholder="WHAT"></textarea>
    //                 <textarea id = "new-task-howmuch" cols="20" row="1" placeholder="HOW MUCH *separate UNIT with '_'"></textarea>
    //                 <textarea id = "new-task-bywhen" cols="12" row="1" placeholder="BY WHEN *yyyy/mm/dd"></textarea>
    //             </li>        
    //         <p class="mordal-btn" id="add-more-task"><span>&#10010;</span>Add next task</p>        
    //         <p class="mordal-btn" id="add-task-done">DONE</p>        
    //     </div>
    //     `;
    //     css_target={
    //         display: "block", content: "", background: "#08304d", width: "100%",
    //         height: "100%", overflow: "hidden", position: "fixed", "z-index": "3",
    //         top: "50px", width: "100%", height: "100%", overflow: "hidden"
    //     };
    //     css_child={
    //         position: "fixed", background: "white", boxShadow: "inset 0px 0px 7px  #264d5788",
    //         paddingTop: "5px", paddingBottom: "5px", top: "20%", left: "25%", width: "50%",
    //         height: "250px", display: "flex", flexDirection: "column", justifyContent: "center",
    //         alignItems: "center",gap: "20px", borderRadius: "15px","z-index": "2"
    //         }
    //     changeContents(target, "10s",  "show",html_str, css_target, css_child)
    // });

    // //生成後のevent定義時は通常通りのセレクタで動くが、この階層ではないので以下のように記載する
    // $(document).on("click","#add-more-task",function(){
    //     console.log("ss")
    //     add_task_item()
    //     $("#new-task-what").val("")
    //     $("#new-task-howmuch").val("")
    //     $("#new-task-bywhen").val("")
    // });

    // $(document).on("click","#add-task-done",function(){
    //     add_task_item()
    //     changeOpacity(target_element,"0.7s");
    //     task_list_sync()
    // });

});
$("#add-goal-btn").on("click",function(e){
    e.stopImmediatePropagation()
    console.log("add side button")
    mordalAddGoal("Button");
});

// *----------------------------------------------------------
// *  function   add/get goal item and task item
// *----------------------------------------------------------
// GOAL
function add_goal_item(){
    let goal_value = localStorage.getItem("goal")
    let delimeter ="|/|"
    let goal_info = $("#new-goal").val()
    if (goal_value != null){
        goal_value += `${delimeter}${goal_info}`
    }else{
        goal_value = `${goal_info}`
    };
    localStorage.setItem("goal",goal_value)
    let index_added = localStorage.getItem("goal").split(delimeter).length-1
    
    return [index_added, goal_value]
};

function get_goal(goal_index=0){
    let goal_value = localStorage.getItem("goal")
    let delimeter ="|/|"
    return (goal_value.split(delimeter))[goal_index];
};

// TASK
function add_task_item(delimeter_flag=false){
    let task_value = localStorage.getItem("task")
    let extra_delimeter = "|@|"
    let delimeter ="|/|"
    let delimeter_sub = "|~|"
    let task_info= [$("#new-task-what").val(),$("#new-task-howmuch").val(),$("#new-task-bywhen").val()]
    if (task_info[0] != "" && task_info[1] != "" && task_info[2] != ""){
        // タスクがすでにあり、ゴールが前と同じ -> same goal = delimeter is |/|
        if (task_value != null && delimeter_flag ==false){
            task_value += `${delimeter}${task_info[0]}${delimeter_sub}${task_info[1]}${delimeter_sub}${task_info[2]}`;
            console.log("vvt0",task_value)

        // タスクがすでにあるが、ゴールが新しくなった
        }else if(task_value != null && delimeter_flag ==true){
            task_value += `${extra_delimeter}${task_info[0]}${delimeter_sub}${task_info[1]}${delimeter_sub}${task_info[2]}`;
            console.log("vvt1",task_value)

            // はじめてのタスク登録時
        }else{
            task_value = `${task_info[0]}${delimeter_sub}${task_info[1]}${delimeter_sub}${task_info[2]}`;
            console.log("vvt2",task_value)

        };
        localStorage.setItem("task",task_value)
        // css_add = {"fontSize":"16px","":"","":""}
        // $(".mordal-task-li").prepend(html_add)
    };
};

function get_task_list(goal_index=0,task_index=null){
    // get_task_list() : only 1 goal exists and all the task item is collected 
    // get_task_list(i1,i2) : 2 or more goals exist and task list is collected with given index
    let task_value = localStorage.getItem("task")
    let goal_delimeter = "|@|"
    let task_delimeter = "|/|"
    let task_delimeter_sub = "|~|"
    let task_list_with_goal_index = (task_value.split(goal_delimeter))[goal_index];

    let task_list = task_list_with_goal_index.split(task_delimeter)
    let task_list_mod =[]
    if (task_index == null) {
        task_list.forEach(element => {
            task_list_mod[task_list_mod.length]=element.split(task_delimeter_sub)    
        });
        return task_list_mod;
    }else{
        return task_list[task_index].split(task_delimeter_sub);    
    };
};

function task_list_sync(){
    let extra_delimeter = "|@|"
    let delimeter = "|/|"
    let delimeter_sub = "|~|"

    let goals = localStorage.getItem("goal");
    let tasks = localStorage.getItem("task");
    let goal_list = goals.split(delimeter);

    for (let i = 0; i < goal_list.length; i++) {
        console.log(i)
        let goal = get_goal(i)
        let html_i = `
        <div class="task-list-items" id ="goal${i}">
            <details class="goal-side">
                <summary>${goal}   
                <span class ="add-task-btn" id="add-task-btn ${i}">Add task</span></summary>
            </details>
        </div>
        `;
        $(".task-list-items").append(html_i);
        console.log($(".task-list-items").html())
        let task_list = get_task_list(i); //goal index = i        
        let html_add =`<p class="task_item_side">${task_list[i][0]}: ${task_list[i][1]}: ${task_list[i][2]}</p>`;
        $(".goal-side").append(html_add);
    }
};
// *----------------------------------------------------------
// *----------------------------------------------------------

