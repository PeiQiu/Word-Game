/**
 * Created by peiqiutian on 13/02/2017.
 */

var ids = new Array();
var reg = /^[\d.]+$/;
var game;
var metadata;
var state = {
    edituser : null,
    user: null,
    page: { pages : ["login", "user_content", "game_holder", "admin_content","editUserModal","metadata_view"], page : null},
}

$(document).ready( function(){
    $.ajax( {
        url : '/user',
        method : 'GET',
        success: (user) => {$('body').addClass("pre_background"); setUser(user)},
        error: () => {$('body').addClass('pre_background'); setPage( 'login' ) ;}
    } );
});

$(window).keydown(
    function (event) {
        if (event.keyCode == "13") {
            makeGuess();
        }
    }
);

function getLevels(levelvalue){
    var levels = metadata['levels'];
    for(var k  in levels){
        if(levels[k].name == levelvalue){
            return levels[k];
        }
    }
    return null;
}

function getFonts(fontvalue) {
    var fonts = metadata.fonts;
    for(var k  in fonts){
        if(fonts[k].family == fontvalue){
            return fonts[k];
        }
    }
    return null;
}

function changeDefault() {
    if(metadata){
        var defaults ={};
        var fontvalue = $('#select_font').val();
        var levelvalue = $('#select_level').val();
        var word = $('#color_word').val();
        var guess = $('#color_guess').val();
        var fore = $('#color_fore').val();
        var colors = {};
        colors.wordBackground = word;
        colors.guessBackground = guess;
        colors.textBackground = fore;
        var font = getFonts(fontvalue);
        var level = getLevels(levelvalue);
        defaults.colors = colors;
        defaults.level = level;
        defaults.font = font;
        updateDefault(defaults);
    }
}


function showGame(game) {
    $('#user_content').slideUp("slow");
    $("#game_holder").slideDown("slow");
    $("#holder_control").show();
    $('#div1').empty();
    $('#div2').empty();
    $('#showremaining').text(game.remaining + " guesses remaining");
    for (var i = 0; i < game.view.length; i++) {
        $('<label>' + game.view.charAt(i) + '</label>').css('font-family', game.font[0].family + "," + game.font[0].category).css('background-color', game.colors.wordBackground).css('color' , game.colors.textBackground).appendTo($('#div2'));
    }
    for (var i = 0; i < game.guesses.length; i++) {
        $('<label>' + game.guesses.charAt(i).toUpperCase() + '</label>').css('font-family', game.font[0].family + "," + game.font[0].category).css('background-color', game.colors.guessBackground).css('color' , game.colors.textBackground).appendTo($('#div1'));
    }
    if (game.status != "unfinished") {
        showResult(game.status);
    } else {
        $('#holder_background').attr('style', 'background : ""');
    }
}


function showResult(status) {
    $('#holder_control').hide();
    if (status == "victory") {
        $('#holder_background').attr('style', 'background:url("./images/winner.gif")');
    } else {
        $('#holder_background').attr('style', 'background:url("./images/cry.gif")');
    }
}

function getView(game) {
    var s = game.view.split("");
    return     "<span>" + s.join("</span><span>") + "</span>";
}

function containTarget(game) {
    return (game.target) ? game.target : ""
}

function makeRow(game) {
    return $('<tr><td>' + game.level.name + '</td><td>' + getView(game) + '</td><td>' + game.remaining + '</td><td>' + containTarget(game) + '</td><td>' + game.status + '</td></tr>');
}

function updateRow(game) {
    var s = ids.indexOf(game.id);
    var row = makeRow(game);
    $(row[0].getElementsByTagName('span')).css('font-family', game.font[0].family + "," + game.font[0].category).css('background-color', game.colors.wordBackground).css('color' , game.colors.textBackground);
    row.click((event) => retrieveGame(game));
    if (s < 0) {
        ids.push(game.id);
        $('#game_table').append(row);
    } else {
        $('#game_table').children().eq(s).html(row.html());
    }
}

function updateTable(games) {
    if(games.error){
        alert(games.error);
    }
    ids = [];
    for (var key in games) {
        updateRow(games[key]);
    }
}

function cancel() {
    $('#user_content').slideDown("slow");
    $('#game_holder').slideUp("slow");
}

function getFontData(fontdata) {
    fontdata.forEach((p) => {
        $(`<link rel="stylesheet" href="${p.url}">`).appendTo($('head'));
        $(`<option value ="${p.family}">${p.family}</option>`).appendTo($('#select_font'));
    });
}

function getmetadata(data) {

    getFontData( metadata.fonts );
    if(!state.user.defaults){
        state.user.defaults = metadata.defaults;
        updateDefault(state.user.defaults);
    }
    $('#select_level').empty();
    for (var key in metadata.levels) {
        $('<option value = ' + key + '>' + key + '</option>').appendTo($('#select_level'));
    }
    $('#select_font').val(state.user.defaults.font.family);
    $('#select_level').val(state.user.defaults.level.name);
    $('#color_word').val(state.user.defaults.colors.wordBackground);
    $('#color_guess').val(state.user.defaults.colors.guessBackground);
    $('#color_fore').val(state.user.defaults.colors.textBackground);
    $('#select_font').css('font-family', state.user.defaults.font.family);
    $('#select_font').change( () => {
        $('#select_font').css('font-family', $('#select_font option:selected').val());
    });
    $('#select_font').change(
        function(){ changeDefault()}
    );
    $('#select_level').change(
        function(){ changeDefault()}
    );
    $('#color_fore').change(
        function(){ changeDefault()}
    );
    $('#color_guess').change(
        function(){ changeDefault()}
    );
    $('#color_word').change(
        function(){ changeDefault()}
    );
}

function buildtable(metadata) {
    var fonts = metadata.fonts;
    var levels = toArray(metadata.levels);
    var defaults = metadata.defaults;
    $('#defaults_color_word').val(metadata.defaults.colors.wordBackground);
    $('#defaults_color_guess').val(metadata.defaults.colors.guessBackground);
    $('#defaults_color_fore').val(metadata.defaults.colors.textBackground);
    var selectedfont = defaults.font;
    var selectedlevel = defaults.level;
    buildFontstable(fonts);
    buildLevelstable(levels);
    $('#input_font_family'+ selectedfont.family).attr('checked', 'checked');
    $('#input_levels_'+selectedlevel.name).attr('checked', 'checked');
    $('#defaults_color_fore').change(
        function(){ changeDefaults()}
    );
    $('#defaults_color_word').change(
        function(){ changeDefaults()}
    );
    $('#defaults_color_guess').change(
        function(){ changeDefaults()}
    );
}
function buildLevelstable(levels) {
    $('#levels_table').empty();
    var table = $('#levels_table');
    var addtr = addLevelRow();
    addtr.appendTo(table);
    makeLevelsRows(table, levels);
}

function buildFontstable(fonts) {
    $('#fonts_table').empty();
    var table = $('#fonts_table');
    var addtr = addFontRow();
    addtr.appendTo(table);
    makeFontsRows(table, fonts);
}

function makeLevelsRows(table, levels) {
    levels.forEach((level, index) => {
       var tr = makelevelRow(level, index);
       tr.appendTo(table);
       bindLevelRow(index, level);
    });
}


function makeFontsRows(table, fonts) {
    fonts.forEach( (font, index) => {
        var tr = makeFontRow(font, index);
        tr.appendTo( table);
        bindRow(index , font);
    } );
}

function bindLevelRow(index, level) {
    $('#input_level_name_'+index).on('input propertychange', function () {
        if($('#input_level_name_'+index).val() != level.name){
            $('#level_row'+index).removeClass('hidden');
        }else{
            $('#level_row'+index).addClass('hidden');
        }
    });

    $('#input_level_max_'+index).on('input propertychange', function () {
        var max = $('#input_level_max_'+index).val(); //reg
        if( reg.test(max) && max != level.maxLength){
            $('#level_row'+index).removeClass('hidden');
        }else{
            $('#level_row'+index).addClass('hidden');
        }
    });

    $('#input_level_min_'+index).on('input propertychange', function () {
        var min = $('#input_level_min_'+index).val();
        var max = $('#input_level_max_'+index).val();
        if( reg.test(min) && min != level.minLength ){
            if( parseInt(min) > parseInt(max)){
                alert("maxLength must bigger than minLength");
                $('#input_level_min_'+index).val(level.minLength);
            }else{
                $('#level_row'+index).removeClass('hidden');
            }
        }else{
            $('#level_row'+index).addClass('hidden');
        }
    });

    $('#input_level_guesses_'+index).on('input propertychange', function () {
        var guesses = $('#input_level_guesses_'+index).val();
        if(reg.test(guesses) && guesses != level.guesses){
            $('#level_row'+index).removeClass('hidden');
        }else{
            $('#level_row'+index).addClass('hidden');
        }
    });
}

function showAddlevelRow(flag) {
    if(flag){
        $('#addlevelrow').removeClass('hidden');
    }else{
        $('#addlevelrow').addClass('hidden');
        $('#input_level_name_add').val('');
        $('#input_level_min_add').val('');
        $('#input_level_max_add').val('');
        $('#input_level_guesses_add').val('');
    }

}

function bindRow(index , font){
    $('#input_font_rule_'+index).on('input propertychange' ,function () {

        if($('#input_font_rule_'+index).val()!= font.rule) {
            $('#font_row'+index).removeClass('hidden');
        }else{
            $('#font_row'+index).addClass('hidden');
        };
    });
    $('#input_font_family_'+index).on('input propertychange' ,function () {
        if ($('#input_font_family_' + index).val() != font.family) {
            $('#font_row' + index).removeClass('hidden');
        } else {
            $('#font_row' + index).addClass('hidden');
        }
        ;
    });
    $('#input_font_url_'+index).on('input propertychange' ,function () {
        if ($('#input_font_url_' + index).val() != font.url) {
            $('#font_row' + index).removeClass('hidden');
        } else {
            $('#font_row' + index).addClass('hidden');
        }
        ;
    });
    $('#input_font_category_'+index).on('input propertychange' ,function (){
        if ($('#input_font_category_' + index).val() != font.category) {
            $('#font_row' + index).removeClass('hidden');
        } else {
            $('#font_row' + index).addClass('hidden');
        }
        ;
    });
}

function makelevelRow(level, index) {
    return $(`<tr><td><input type="radio" id = "input_levels_${level.name}" onclick="changeDefaults('level', '${level.name}')" name="option_level"  /></td><td>`+
        `<input id = 'input_level_name_${index}' value="${level.name}"></td><td>`+ `<input id = "input_level_min_${index}" value="${level.minLength}"></td><td>` +
        `<input id = "input_level_max_${index}" value="${level.maxLength}"></td><td>`+ `<input id = "input_level_guesses_${index}" value="${level.guesses}"></td><td>`+
        `<button type="button" class="btn btn-info" onclick="deleteMetadataLevel('${level.name}')">Delete</button></td><td><button id = "level_row${index}" type="button" class="btn btn-info hidden" onclick="updateMetadataLevel(${index}, '${level.name}')">Update</button></td></tr>`);
}


function makeFontRow(font, index){
    return $(`<tr><td><input type="radio" id = "input_font_family${font.family}" onclick="changeDefaults('font', '${index}')" name="option_font"  /></td><td>`+
        `<input id = 'input_font_rule_${index}' value="${font.rule}"></td><td>`+`<input id = "input_font_family_${index}" value="${font.family}"></td><td>`+
        `<input id = "input_font_url_${index}" value="${font.url}"></td><td>`+`<input id = "input_font_category_${index}" value="${font.category}"></td><td>`+
        `<button type="button" class="btn btn-info" onclick="deleteMetadataFont(${index}, '${font.family}')">Delete</button></td><td><button id = "font_row${index}" type="button" class="btn btn-info hidden" onclick="updateMetadataFont(${index}, '${font.family}')">Update</button></td></tr>`);
}

function addLevelRow() {
    return $(`<tr id = "addlevelrow" class="hidden"><td></td><td><input id = 'input_level_name_add'></td><td><input id = "input_level_min_add" ></td>
                           <td><input id = 'input_level_max_add'></td> <td><input id = "input_level_guesses_add"></td>
                           <td><button type="button" class="btn btn-info" onclick="addMetadataLevel()">Submit</button></td>
                           <td><button type="button" class="btn btn-info" onclick="showAddlevelRow(false)">Cancel</button></td></tr>`);
};

function addFontRow() {
    return $(`<tr id = "addfontrow" class="hidden"><td></td><td><input id = 'input_font_rule_add'></td><td><input id = "input_font_family_add" ></td>
                           <td><input id = 'input_font_url_add'></td> <td><input id = "input_font_category_add"></td>
                           <td><button type="button" class="btn btn-info" onclick="addMetadataFont()">Submit</button></td>
                           <td><button type="button" class="btn btn-info" onclick="showAddFontRow(false)">Cancel</button></td></tr>`);
}



function showAddFontRow(flag) {
    if(flag){
        $('#addfontrow').removeClass('hidden');
    }else{
        $('#addfontrow').addClass('hidden');
        $('#input_font_rule_add').val('');
        $('#input_font_family_add').val('');
        $('#input_font_url_add').val('');
        $('#input_font_category_add').val('');
    }
}

function cancelMetadataView() {
    $('#metadata_view').hide();
    $('#admin_content').show();
}
function setPage(page){
    state.page.page = page;
    if(page == 'login'){
        $('body').addClass("pre_background");
    }else{
        $('body').removeClass("pre_background");
    }
    state.page.pages.forEach(
        p => {
            var selector = "#" + p;
            state.page.page == p ? $(selector).show() : $(selector).hide();
        }
    );
}

function setUser( user ) {
    state.user = user;
    if(user){
        getmeta();
    }
    if(user){
        if(user.role == 'admin'){
            $('#admin_email').text(user && user.email)
            setPage('admin_content');
            UserTable();
        }else{
            $('#email').text(user && user.email);
            setPage('user_content');
            $('#game_table').empty();
            retrieveGames();
        }
    }else{
        setPage('login');
    }
}

/************************************* Ajax *****************************************/

function login(event) {
    event.preventDefault();
    var username = $('#login_username').val();
    var password = $('#login_password').val();
    $('#login_username').val('');
    $('#login_password').val('');
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var p = password.match(/^(?=.*\d)[A-Za-z\d]{8,}$/g);
    if(re.test(username)){
        $.ajax({
            url: 'wordgame/api/v3/login',
            method: 'POST',
            data: {"username" : username, "password": password},
            success:function (result, status, xhr) {
                var csrf = xhr.getResponseHeader('x-csrf');
                localStorage.setItem('x-csrf', csrf);
                setUser(result);
            },
            error: function (xhr, status, error) {
                alert(xhr['responseText']);
            }
        });
    }else {
        alert("invalied input!!")
    }
}

function logout() {
    $.ajax({
        url: '/wordgame/api/v3/logout',
        method: 'POST',
        success: () => {setUser(null); localStorage.removeItem('x-csrf');}
    });
}

function updateDefault(defaults) {
    $.ajax({
        url: '/wordgame/api/v3/'+ state.user.id +'/defaults',
        method: 'PUT',
        headers: {'x-csrf': localStorage.getItem('x-csrf')},
        contentType : "application/json",
        data: JSON.stringify(defaults),
        success: (de) => { state.user = de}
    });
}

function getmeta() {
    $.ajax({
        url: '/wordgame/api/v3/meta',
        method: 'GET',
        headers: {'x-csrf': localStorage.getItem('x-csrf')},
        success: function(data){
            metadata = data[0];
            if(state.user.role == "admin"){
                $("#fonts_table").empty();
                $("#levels_table").empty();
                buildtable(metadata);
            }else{
                getmetadata(data);
            }
        }
    });
}

function createGame(event) {
    event.preventDefault();
    var font = $('#select_font').val();
    var level = $('#select_level').val();
    var word = $('#color_word').val();
    var guess = $('#color_guess').val();
    var fore = $('#color_fore').val();
    if(!font || !level){
        alert("please select font or level!!");
        return;
    }
    var colors = {};
    colors.wordBackground = word;
    colors.guessBackground = guess;
    colors.textBackground = fore;//{ 'wordBackground': word, 'guessBackground' : guess ,'textBackground' : fore};
    $.ajax({
        url: '/wordgame/api/v3/' + state.user.id + "?level=" + level,
        method: 'POST',
        headers: {'X-font': font,'x-csrf': localStorage.getItem('x-csrf')},
        data: colors,
        success: retrieveGame
    });
}

function makeGuess() {
    var w = $('#word').val();
    $('#word').val("");
    if (w.match(/^[a-zA-Z]$|^-$|^'$/i)) {
        $.ajax({
            url: `/wordgame/api/v3/${state.user.id}/${game.id}/guesses/?guess=${w}`,
            method: 'POST',
            headers: {'x-csrf': localStorage.getItem('x-csrf')},
            success: retrieveGame
        });
    }
}

function retrieveGame(obj) {
    if (obj.error) {
        alert(obj.error);
    } else {
        game = obj;
        $.ajax({
            url: '/wordgame/api/v3/' + state.user.id + '/' + obj.id,
            method: 'GET',
            headers: {'x-csrf': localStorage.getItem('x-csrf')},
            success: (thing) => {
                showGame(thing);
                updateRow(thing);
            }
        });
    }
}

function retrieveGames() {
    $.ajax({
        url: '/wordgame/api/v3/' + state.user.id,
        method: 'GET',
        headers: {'x-csrf': localStorage.getItem('x-csrf')},
        success: (games) => (games.length !=0 ? updateTable(games) : "")
    });
}

function UserTable() {
    $("#user_table").empty();
    $.ajax({
        url : '/wordgame/api/v3/admins/users',
        method : 'GET',
        headers: {'x-csrf': localStorage.getItem('x-csrf')},
        success : buildUsertable
    });
}



function getValue(flag) {
    var emailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var result = {};
    var first = $('#user_firstname').val();
    var last = $('#user_lastname').val();
    result.email = $('#user_email').val();
    if( result.email == '' || !(emailReg.test(result.email))){
        alert('input params is wrong!');
        return;
    }
    result.role = $('#user_role').val();
    var enable = $('#user_status').val();
    if(flag){

        if(!($('#user_password').val().match(/^(?=.*\d)[A-Za-z\d]{8,}$/g))){
            alert('password format wrong!');
            $('#user_password').val('');
            return;
        }
        result.password = $('#user_password').val();
        $('#user_password').val('');
    }
    result.name = {};
    result.name.first = first;
    result.name.last = last;
    if(enable == "1"){
        result.enabled = true;
    }else{
        result.enabled = false;
    }
    return result;
}

function createUser() {
    var newuser = getValue(true);
    if(!newuser){
        return;
    }
    $.ajax({
        url : '/wordgame/api/v3/admins/users',
        method : 'POST',
        contentType : "application/json",
        data : JSON.stringify(newuser),
        headers: {'x-csrf': localStorage.getItem('x-csrf')},
        success : function(data){
            if(data.msg){
                alert(data.msg);
            }else{
                UserTable();
                showUserView()
            }
        }
    });
}

function updateUser() {
    var newuser = getValue(false);
    $.ajax({
        url : '/wordgame/api/v3/admins/users/'+state.edituser.id,
        method : 'PUT',
        contentType : "application/json",
        data : JSON.stringify(newuser),
        headers: {'x-csrf': localStorage.getItem('x-csrf')},
        success : function (data) {
            if(data.msg){
                alert(data.msg);
            }else{
                UserTable();
                showUserView();
            }
        }
    });
}
function makeUserRow(type, values){
    return $(`<tr><${type}>` + values.join(`</${type}><${type}>`) + `</${type}></tr>` );
}

function buildUsertable(users) {
    var table = $('#user_table').empty();
    var props = ['first-name', 'last-name', 'email', 'role', 'enabled'];
    var props_val = ['first', 'last', 'email', 'role', 'enabled'];

    makeUserRow('th', props).appendTo(table);
    users.forEach( user => {
            var tr = makeUserRow('td', props_val.map( p => user[p]? user[p] : (user.name[p] ? user.name[p] : "false")));
            tr.click((event) => {showUserView(user); showAddUser(false)});
            tr.appendTo(table);
    });
}

function showuserviewpage() {
    showAddUser(true);
    showUserView(true);
}

function cancelUserEditModal(){
    showUserView(null);
}

function showAddUser(flag) {
    if(flag){
        $('#update_user_button').hide();
        $('#add_user_password').show();
        $('#add_user_button').show();
    }else{
        $('#add_user_password').hide();
        $('#add_user_button').hide();
        $('#update_user_button').show();
    }
}

function showUserView(user) {
    state.edituser = user;
    if(user){
        $('#admin_content').slideUp();
        $('#editUserModal').slideDown();
    }else{
        $('#admin_content').slideDown();
        $('#editUserModal').slideUp();
    }
    if(user == true){
        user = null;
    }
    fillUserView(user);
}

function fillUserView(user) {
        $('#user_firstname').val(user ? user.name.first : '');
        $('#user_lastname').val(user ? user.name.last : '');
        $('#user_email').val(user ? user.email : '');
        $('#user_password').val('');
        $('#user_role').val(user ? user.role : 'user');
        if(user && user.enabled){
            $('#user_status').val('1')
        }else{
            $('#user_status').val('0')
        }
        if(state.edituser && state.edituser.id == state.user.id){
            $('#user_status').attr('disabled','disabled');
            $('#user_role').attr('disabled','disabled');
        }else{
            $('#user_status').removeAttr('disabled');
            $('#user_role').removeAttr('disabled');
        }
}

function showmetadatapage() {
    $('#metadata_view').show();
    $('#admin_content').hide();
    $('#editUserModal').hide();
}

function searchUsers(event){
    event.preventDefault();
    var filter = $('#search_string').val();
    var filter_enabled;
    $('#search_string').val('');
    var status = $('#select_user').val();
    if(status == '1'){
        filter_enabled = true;
    }else{
        filter_enabled = false;
    }
    $.ajax({
        url : '/wordgame/api/v3/admins/users',
        method : 'GET',
        headers: {'x-csrf': localStorage.getItem('x-csrf')},
        data : {filter : filter, filter_enabled : filter_enabled},
        success : buildUsertable
    });
}

function toArray(levels) {
    var array = [];
    for(var key in levels){
        array.push(levels[key]);
    }
    return array;
}

function updateMetadataFont(index, fontfamily) {
        var newfont = {};
        newfont.rule = $('#input_font_rule_'+index).val();
        newfont.family = $('#input_font_family_'+index).val();
        newfont.url = $('#input_font_url_' + index).val();
        newfont.category = $('#input_font_category_' + index).val();
        if( !newfont.category || !newfont.family || !newfont.url || !newfont.rule){
            alert("invalied input!!");
            return;
        }
        $.ajax({
            url : '/wordgame/api/v3/admins/meta/fonts',
            method : 'PUT',
            contentType : "application/json",
            headers: {'x-csrf': localStorage.getItem('x-csrf')},
            data : JSON.stringify({family : fontfamily, newfont : newfont}),
            success : getmeta
        });
}

function deleteMetadataFont(index, fontfamily) {
    $.ajax({
        url : '/wordgame/api/v3/admins/meta/fonts',
        method : 'DELETE',
        contentType : "application/json",
        headers: {'x-csrf': localStorage.getItem('x-csrf')},
        data : JSON.stringify({family : fontfamily}),
        success : getmeta
    });
}

function updateMetadataLevel(index, name) {
    var newlevel = {};
        newlevel.name = $('#input_level_name_'+index).val();
        if(!reg.test($('#input_level_max_'+index).val()) || !reg.test($('#input_level_min_'+index).val()) || !reg.test($('#input_level_min_'+index).val())){
        alert('invalied input!');
        return;
        }
        newlevel.maxLength = parseInt($('#input_level_max_'+index).val());
        newlevel.minLength = parseInt($('#input_level_min_'+index).val());
        newlevel.guesses = parseInt($('#input_level_guesses_'+index).val());
        if( !newlevel.name || !newlevel.guesses|| !newlevel.maxLength || !newlevel.minLength || newlevel.minLength > newlevel.maxLength ||
            newlevel.maxLength < 0 || newlevel.minLength < 0 || newlevel.guesses < 0){
        alert("the input params is not correct!");
        return ;
        }
        if(name != newlevel.name && valified(newlevel.name)){
            alert("the update name is not correct!!");
            return;
        }

        $.ajax({
            url : '/wordgame/api/v3/admins/meta/levels',
            method : 'PUT',
            contentType : "application/json",
            headers: {'x-csrf': localStorage.getItem('x-csrf')},
            data : JSON.stringify({ name: name, newlevel : newlevel}),
            success : getmeta
        });
}

function deleteMetadataLevel(name) {
    $.ajax({
        url : '/wordgame/api/v3/admins/meta/levels',
        method : 'DELETE',
        contentType : "application/json",
        headers: {'x-csrf': localStorage.getItem('x-csrf')},
        data : JSON.stringify({ name: name }),
        success : getmeta
    });
}

function addMetadataFont() {
    var newfont = {};
    newfont.rule = $('#input_font_rule_add').val();
    newfont.family = $('#input_font_family_add').val();
    newfont.url = $('#input_font_url_add').val();
    newfont.category = $('#input_font_category_add').val();
    if( !newfont.category || !newfont.family || !newfont.url || !newfont.rule){
        alert("invalied input!!");
        return;
    }
    $('#input_font_rule_add').val('');
    $('#input_font_family_add').val('');
    $('#input_font_url_add').val('');
    $('#input_font_category_add').val('');
    $.ajax({
        url : '/wordgame/api/v3/admins/meta/fonts',
        method : 'POST',
        contentType : "application/json",
        headers: {'x-csrf': localStorage.getItem('x-csrf')},
        data : JSON.stringify({newfont : newfont}),
        success : getmeta
    });

}

function addMetadataLevel() {
    var level = {};
    level.name = $('#input_level_name_add').val();
    if(reg.test(!($('#input_level_min_add').val()) && reg.test($('#input_level_max_add').val()))){
        alert('invalied input!');
        return;
    }
    level.minLength = parseInt($('#input_level_min_add').val());
    level.maxLength = parseInt($('#input_level_max_add').val());
    level.guesses = parseInt($('#input_level_guesses_add').val());
    if( !level.name || !level.guesses|| !level.maxLength || !level.minLength || level.minLength > level.maxLength || level.maxLength < 0 ||
     level.minLength < 0 || level.guesses < 0 || valified(level.name)){
        alert("the input params is not correct!");
        return ;
    }
    $('#input_level_name_add').val('');
    $('#input_level_min_add').val('');
    $('#input_level_max_add').val('');
    $('#input_level_guesses_add').val('');
    $.ajax({
        url : '/wordgame/api/v3/admins/meta/levels',
        method : 'POST',
        contentType : "application/json",
        headers: {'x-csrf': localStorage.getItem('x-csrf')},
        data : JSON.stringify({ newlevel : level}),
        success : getmeta
    });
}

function changeDefaults(type, index){
    var defaults = metadata.defaults;
    if(type == 'font'){
        defaults.font =  metadata.fonts[index];
    }
    if(type == 'level'){
        defaults.level = metadata.levels[index];
    }
    defaults.colors.guessBackground = $('#defaults_color_guess').val();
    defaults.colors.textBackground = $('#defaults_color_fore').val();
    defaults.colors.wordBackground = $('#defaults_color_word').val();
    $.ajax({
        url : '/wordgame/api/v3/admins/meta/defaults',
        method : 'PUT',
        contentType : "application/json",
        headers: {'x-csrf': localStorage.getItem('x-csrf')},
        data : JSON.stringify({newdefaults : defaults}),
        success : getmeta
    });
}
function valified(name) {
    if(metadata){
        return metadata.levels[name];
    }
    return null;
}






