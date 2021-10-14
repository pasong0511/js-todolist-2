const todoForm = document.querySelector("#InsertForm");
const todoInput = document.querySelector("#InsertForm input");
const listView = document.querySelector("#TodoListView");

const STATUS = {
    NORMAL : true,
    COMPLETED : false
}

function addTodoItem(){   
    const newTodo = todoInput.value;        //입력 받은 값
    const stateTodo = STATUS.NORMAL;             //입력 받은 값의 상태 normal OR delete
    const newTodoObj = {
        text : newTodo,                     //입력 받은 값 딕셔너리 생성
        state : stateTodo,
    };

    addListItem(newTodoObj)                 //새로운 tobo객체 생성 후 HTML li 생성 과정에 넘기기
    console.log(newTodoObj);
}

function addListItem(newTodoObj){
    const li = document.createElement("li");
    const itemName = document.createElement("span");        // 아이템 이름
    const removeBtn = document.createElement("span");       //삭제 버튼


    removeBtn.innerHTML=`<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></svg>`

    li.appendChild(itemName);               //li태그로 아이템 이름 추가
    li.appendChild(removeBtn);              //li태그로 버튼 추가   

    itemName.innerText = newTodoObj.text;   //아이템 입력 값 추가
    listView.appendChild(li);               //li 리스트 생성
    li.classList.add("TodoListItem-virtualized");

    removeBtn.addEventListener("click", handleListItemClick);       //삭제 버튼 클릭 시 삭제 함수 실행
    listView.addEventListener("click", handelListItemCompleted);     //완료시 체크 핸들을 통해 가운데 선 그림
}

//삭제 이벤트 핸들러 함수
function handleListItemClick(event){
    removeListItem(event.target.parentElement);
}

//삭제 기능 함수
function removeListItem(element){
    element.parentElement.remove();
}

//완료 이벤트 핸들러 함수
function handelListItemCompleted(event){
    modifyListItem(event.target);           //클릭한 아이템 이름의 li를 수정
}

//수정 기능 함수
function modifyListItem(modifyTodo){
    modifyTodo.classList.toggle("compeletedItem");
}

function handleSubmit(event){
    event.preventDefault();
    if (todoInput.value === ""){            //빈 값이 들어오면 입력 방지
        return ;
    }
    addTodoItem(event);
    todoInput.value = "";                   //입력하면 인풋값 초기화
}

todoForm.addEventListener("submit", handleSubmit);