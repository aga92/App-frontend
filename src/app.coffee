class Gui
  constructor: ->
  createElementFor: (templateId, data) =>
    source = ($(templateId).html() )
    template = Handlebars.compile(source)
    html = template(data)
    element = $(html)

  showMyElem: (data)=>
    element = @createElementFor("#abc-template",{posts: data})
    $(".main").append(element)

class Provider
  constructor: ->
  getUserDataOld: =>
    theData = [{firstName:"Michael", lastName:'Alexander', age:20}, {firstName:'John', lastName:'Allen', age:29}]
    @providedUserData(theData)
  providedUserData: (userData) =>

  getUserData: =>
    $.ajax 'http://firstbackendapp.shellyapp.com/posts.json',#'data/abc.json', # , #
      type : 'GET'
      datatype : "jsonp"
      jsonp : 'jsonp'
      crossDomain : 'true'
      success  : (res, status, xhr) =>
        console.log('success')
        @providedUserData(res)
      error    : (xhr, status, err) ->
        console.log('error ajax err = ' + err)
      complete : (xhr, status) ->
        console.log('complete ajax')

class UseCase
  constructor: ->
  start: =>
    @getData()
  getData: =>
  dataReceived: =>

class Glue
  constructor: (@useCase, @gui, @provider) ->
    After(@useCase, "getData", => @provider.getUserData() )
    After(@provider, "providedUserData", (userData) => @gui.showMyElem(userData))
    LogAll(@useCase)
    LogAll(@gui)
    LogAll(@provider)

class App
  constructor: ->
    console.log('hello, app.coffee')
    useCase = new UseCase()
    gui = new Gui()
    provider = new Provider()
    glue = new Glue(useCase, gui, provider)
    useCase.start()

new App()



