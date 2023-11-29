/**
* name: Read
* usage: Read the written text with code, only read once
* args: No
**/

function read(code) {

    if(code == undefined || code.length != 8) {
        return "A code is required to read the text";
    }

    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/woop/read?code="+code , false);
    xhr.onload = () => {};
    xhr.send(null);
    return xhr.responseText;
}
