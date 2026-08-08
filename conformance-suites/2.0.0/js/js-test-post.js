/*
** Copyright (c) 2012 The Khronos Group Inc.
**
** Permission is hereby granted, free of charge, to any person obtaining a
** copy of this software and/or associated documentation files (the
** "Materials"), to deal in the Materials without restriction, including
** without limitation the rights to use, copy, modify, merge, publish,
** distribute, sublicense, and/or sell copies of the Materials, and to
** permit persons to whom the Materials are furnished to do so, subject to
** the following conditions:
**
** The above copyright notice and this permission notice shall be included
** in all copies or substantial portions of the Materials.
**
** THE MATERIALS ARE PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
** EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
** MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
** IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
** CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
** TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
** MATERIALS OR THE USE OR OTHER DEALINGS IN THE MATERIALS.
*/

async function postData(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
}

function attemptPost(url, data, retryInterval = 100) {
    postData(url, data)
        .then(data => {
            // console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
            setTimeout(() => {
                attemptPost(url, data, retryInterval);
            }, retryInterval);
        });
}

attemptPost('http://127.0.0.1:5000/savejson', {
    shaders: window.hydShaders,
    // source: source,
    // type: type,
    url: window.location.href,
});

shouldBeTrue("successfullyParsed");
_addSpan('<br /><span class="pass">TEST COMPLETE</span>');
if (_jsTestPreVerboseLogging) {
    _bufferedLogToConsole('TEST COMPLETE');
}
notifyFinishedToHarness()
