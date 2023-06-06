const multer = require('multer');

// Diretório onde os arquivos serão salvos
// ATENÇÃO: É necessário manter o diretório 'public' para poder utilizar no front-end
let dirPath;

function setPath(dir){
  dirPath = `public/assets/uploads/${dir}`;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dirPath) 
  },
  
  filename: (req, file, cb) => {
    const extensaoArquivo = file.originalname.split('.')[1];

    const novoNomeArquivo = require('crypto')
      .randomBytes(32)
      .toString('hex');


    cb(null, `${novoNomeArquivo}.${extensaoArquivo}`)
  }
});


module.exports = 
  multer({ storage }),
  setPath
