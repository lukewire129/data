const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

// content 폴더 경로
const directoryPath = path.join(__dirname, "_posts");

// 파일 목록을 스캔하여 JSON 형식으로 저장하는 함수
fs.readdir(directoryPath, function (err, files) {
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }
  const excludedSubfolders = ["about"]; // 제외할 하위 폴더 이름 추가

  // 파일 목록을 스캔하여 JSON 형식으로 저장하는 함수
  const getFilesRecursively = (dir) => {
    const files = fs.readdirSync(dir);
    let fileList = [];

    files.forEach((file) => {
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
        if (path.extname(file) === ".md") {
          // 파일 읽기
          const fileContents = fs.readFileSync(filePath, "utf8");

          // YAML Front Matter 추출
          const meta = fileContents.match(/^---\r?\n([\s\S]+?)\r?\n---/);
          let metadata = {};
          if (meta && meta[1]) {
            try {
              // YAML 데이터를 파싱하여 객체로 변환
              metadata = yaml.load(meta[1]);
            } catch (e) {
              console.error(`YAML parsing error in file: ${filePath}`, e);
              // 파싱 실패해도 메타데이터 없이 진행
            }
          }

          // 파일 정보를 추가
          fileList.push({
            name: file, // 파일명
            path: path.relative(__dirname, filePath), // 상대 경로
            customTag: "blog-post", // 커스텀 속성 (필요시 변경 가능)
            metadata: metadata, // 메타데이터 추가 (없으면 빈 객체)
          });
        }
      }
    });

    return fileList;
  };

  // 파일 목록 가져오기
  const fileList = getFilesRecursively(directoryPath);
  // 카테고리별로 파일 목록을 정리
  const tagsFiles = {};

  fileList.forEach((file) => {
    const tags = file.metadata.tags;
    if (tags) {
      console.log(tags);
      tags.forEach((tag) => {
        if (!tagsFiles[tag]) {
          tagsFiles[tag] = []; // 카테고리가 없으면 새로 생성
        }
        tagsFiles[tag].push({
          name: file.name,
          path: file.path,
          metadata: file.metadata,
        });
      });
    }
  });
  const transformedTags = Object.keys(tagsFiles).map((tag) => {
    return {
      tagname: tag,
      blogs: tagsFiles[tag],
    };
  });
  console.log(transformedTags);
  // JSON 파일로 저장
  fs.writeFileSync("tagBlogs.json", JSON.stringify(transformedTags, null, 2));
  console.log("tagBlogs file list with metadata generated successfully.");
});
