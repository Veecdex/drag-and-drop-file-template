function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    var files = event.dataTransfer.files;
    displayFiles(files);
}

function handleFileSelect(event) {
    var files = event.target.files;
    displayFiles(files);
}

function displayFiles(files) {
    var fileDisplayBox = document.getElementById('file-display-box');

    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var fileInfo = document.createElement('button');
        fileInfo.textContent = `${file.name} - ${formatBytes(file.size)}`;
        fileInfo.addEventListener('click', (function(file) {
            return function() {
                openFile(file);
            };
        })(file));
        fileDisplayBox.appendChild(fileInfo);
    }
}

function openFile(file) {
    var fileContentBox = document.getElementById('file-content-box');

    // Check if the file is an image
    if (file.type.startsWith('image/')) {
        var img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        fileContentBox.innerHTML = ''; // Clear previous content
        fileContentBox.appendChild(img);
    } else {
        var reader = new FileReader();
        reader.onload = function(e) {
            fileContentBox.textContent = e.target.result;
        };
        reader.readAsText(file);
    }
}

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function selectFiles() {
    document.getElementById('file-input').click();
}