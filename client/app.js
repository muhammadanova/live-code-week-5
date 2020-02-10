
  var base_url = "http://localhost:3000"

  var loginPage = $("#loginPage")
  var registerPage = $("#registerPage")
  var listComic = $("#listComic")
  var editComicPage = $("#editComicPage")

  var formLogin = $("#formLogin")
  var formRegister = $("#formRegister")
  var editComic = $("#formEditComic")

  var doLogout = $("#btn-logout")
  var btnLoginPage = $("#btn-login")
  var btnRegisterPage = $("#btn-register")
  var alertComp = $("#alert")
  var captionAlert = $("#caption-alert")

  var email_login = $("#email-login")
  var password_login = $("#password-login")

  var name_regist = $("#name-regist")
  var email_regist = $("#email-regist")
  var password_regist = $("#password-regist")

  var title_edit = $("#title-edit")
  var author_edit = $("#author-edit")
  var imageUrl_edit = $("#imageUrl-edit")
  var idEdit = $("#idEdit")

  startset()

  function startset(){
    if(!localStorage.token){
      loginPage.show()
      registerPage.hide()
      listComic.hide()
      editComicPage.hide()
    }else{
      loginPage.hide()
      registerPage.hide()
      listComic.show()
      editComicPage.hide()
      getData()
    }
  }

  // SUBMIT FORM ---------------------
  formLogin.on('submit', function(e){
    e.preventDefault()
    let email = email_login.val()
    let pass = password_login.val()
    $.ajax({
      method: 'POST',
      url: `${base_url}/login`,
      data: { 
        email: email,
        password: pass
      }
    })
    .done(res => {
      let email = email_login.val()
      localStorage.setItem('token', res.access_token)
      localStorage.setItem('email', email)
      clearForm(formLogin)
      startset()
      getData()
    })
    .fail(err => {
      startset()
    })
  })
  
  formRegister.on('submit', function(e){
    e.preventDefault()
    let email = email_regist.val()
    let pass = password_regist.val()
    $.ajax({
      method: 'POST',
      url: `${base_url}/register`,
      data: { 
        email: email,
        password: pass
      }
    })
    .done(res => {
      clearForm(doRegister)
      startset()
    })
    .fail(err => {
      console.log(err)
    })
  })
  
  editComic.on('submit', function(e){
    e.preventDefault()
    let dataEdit = {
      title: title_edit.val(),
      author: author_edit.val(),
      imageUrl_edit: imageUrl_edit.val()
    }
    $.ajax({
      method: "PUT",
      url: `${base_url}/comics/${idEdit.val()}`,
      data: dataEdit,
      headers: {
        access_token : localStorage.getItem('token')
      },
    })
    .done(res => {
      editComicPage.hide()
      getData()
    })
    .fail(err => {
      console.log(err)
    })
  })
  
  // CLICK ALL ---------------------
  doLogout.on('click', function(e) {
    e.preventDefault()
    localStorage.clear()
    startset()
  })

  btnLoginPage.click(function(e) {
    e.preventDefault();
    loginPage.show()
    registerPage.hide()
  });
  
  btnRegisterPage.click(function(e) {
    e.preventDefault();
    registerPage.show()
    loginPage.hide()
  });

  function errorMessage(err, slug){
    for(let key in err){
      $(`#${key}-${slug}`).addClass('is-invalid')
      $(`.${key}-${slug}`).text(err[key])
    }
  }

  function getData(){
    $.ajax({
      method: "GET",
      url: `${base_url}/comics`,
      headers: {
        access_token : localStorage.getItem('token')
      },
    })
    .done(res => {
      console.log(res)
      emptyData()
      setData(res)
    })
    .fail(err => {
      console.log(err)
    })
  }

  function setData(data){
    data.map((el, index) => {
      $("#rowComic").append(
      `<div class="col-4 mb-4">
        <div class="card text-center">
          <img
            src="${el.imageUrl}" class="card-img-top">
          <div class="card-body">
            <h5 class="card-title">${el.title}</h5>
            <p class="card-text">${el.author}</p>
            <button class="btn btn-primary" onclick="findComic(${el.id})">Edit</button>
          </div>
        </div>
      </div>`
      )
    })
  }

  function findComic(id){
    $.ajax({
      method: "GET",
      url: `${base_url}/comics/${id}`,
      headers: {
        access_token : localStorage.token
      }
    })
    .done(res => {
      idEdit.val(res.id)
      title_edit.val(res.title)
      author_edit.val(res.author)
      imageUrl_edit.val(res.imageUrl)
      editComicPage.show()
    })
    .fail(err => {
      console.log(err)
    })
  }

  function emptyData(){
    $("#rowComic").empty()
  }

  function clearForm(inputed){
    inputed.find('input').val("")
    inputed.find('textarea').val("")
    inputed.find('option:selected').prop("selected", false)
  }

