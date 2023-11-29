/**
* name: Write
* usage: Write the text to cloud and read it with the generated code
* args: No
**/

function write(text) {
    if(text == undefined || text.length < 10) {
        return "Text at least 10 characters";
    }
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/woop/write", false);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = () => {};
    xhr.send("text="+text);
    return xhr.responseText;
}
