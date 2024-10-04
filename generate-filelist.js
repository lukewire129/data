const fs = require('fs');
const path = require('path');

// content 폴더 경로
const directoryPath = path.join(__dirname, '_posts');

// 파일 목록을 스캔하여 JSON 형식으로 저장하는 함수
fs.readdir(directoryPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    const excludedSubfolders = ['about']; // 제외할 하위 폴더 이름 추가

    // 파일 목록을 스캔하여 JSON 형식으로 저장하는 함수
    const getFilesRecursively = (dir) => {
        const files = fs.readdirSync(dir);
        let fileList = [];
    
        files.forEach(file => {
            const filePath = path.join(dir, file);
            const stats = fs.statSync(filePath);
    
            // 하위 폴더를 제외하고 파일을 추가
            if (stats.isDirectory()) {
                // 현재 폴더가 제외할 하위 폴더인지 체크
                if (!excludedSubfolders.includes(file)) {
                    // 재귀적으로 하위 폴더의 파일들을 가져옴
                    fileList = fileList.concat(getFilesRecursively(filePath));
                }
            } else {
                // .md 파일만 처리
                if (path.extname(file) === '.md') {
                    // 파일 정보를 추가
                    fileList.push({
                        name: file,                          // 파일명
                        size: stats.size,                    // 파일 크기 (bytes)
                        path: path.relative(__dirname, filePath), // 상대 경로
                        lastModified: stats.mtime.toISOString(),  // 마지막 수정 시간
                        customTag: 'blog-post',              // 커스텀 속성 (필요시 변경 가능)
                    });
                }
            }
        });
    
        return fileList;
    };
    
    // 파일 목록 가져오기
    const fileList = getFilesRecursively(directoryPath);
    const recentFiles = fileList
    .sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified))
    .slice(0, 10);

    // JSON 파일로 저장
    fs.writeFileSync('recentblogs.json', JSON.stringify({ files: recentFiles }, null, 2));
    console.log('File list generated successfully.');
});