const fs = require('fs');
const path = require('path');

// content 폴더 경로
const directoryPath = path.join(__dirname, 'content');

// 파일 목록을 스캔하여 JSON 형식으로 저장하는 함수
fs.readdir(directoryPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    // 파일 목록 배열
    const fileList = files.map(file => {
        const filePath = path.join(directoryPath, file);
        const stats = fs.statSync(filePath);

        // 커스텀 속성 추가 가능 (여기서는 파일명, 파일 크기, 경로, 수정 시간)
        return {
            name: file,                          // 파일명
            size: stats.size,                    // 파일 크기 (bytes)
            path: `_posts/${file}`,             // 상대 경로
            lastModified: stats.mtime.toISOString(),  // 마지막 수정 시간
            customTag: 'blog-post',              // 커스텀 속성 (필요시 변경 가능)
        };
    });
    const recentFiles = fileList
    .sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified))
    .slice(0, 10);

    // JSON 파일로 저장
    fs.writeFileSync('filelist.json', JSON.stringify({ files: recentFiles }, null, 2));
    console.log('File list generated successfully.');
});