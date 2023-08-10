const express = require('express');
const router = express.Router();
const board = require('../schemas/boardSchema'); // Assuming the model is imported correctly.
// const { ObjectId } = require('mongodb');

var ObjectId = require('mongoose').Types.ObjectId;

// CORS 설정
router.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});



// 게시글 저장

router.post("/add", async (req, res) => {
  console.log("33333333333333333333333333333333333");

  try {
    // Assuming "content" and "title" are sent from the client as part of the request body.
    const { content, title } = req.body;

    const newBoard = await board.create({   
      content,
      title,
    });

    if (!newBoard) {
      res.status(200).json({ success: false, message: '공지사항 생성 실패' });
    } else {
      res.status(201).json({ success: true, data: newBoard });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.name + ": " + error.message });
  }
});

// 게시글 데이터 조회

router.get("/add", async (req, res) => {
  console.log("33333333333333333333333333333333333");

  try {

    const findBoard = await board.find({});
console.log(findBoard)
    if (!findBoard) {
      res.status(200).json({ success: false, message: '데이터 조회 실패' });
    } else {
      res.status(201).json({ success: true, data: findBoard });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.name + ": " + error.message });
  }
});

// router.get("/add", async (req, res) => {
//   console.log("33333333333333333333333333333333333");

//   try {
//     // Assuming "content" and "title" are sent from the client as part of the request body.
//     const { content, title } = req.body;

//     const newBoard = await board.create({   
//       content,
//       title,
//     });

//     if (!newBoard) {
//       res.status(200).json({ success: false, message: '공지사항 생성 실패' });
//     } else {
//       res.status(201).json({ success: true, data: newBoard });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ success: false, message: error.name + ": " + error.message });
//   }
// });

// 게시물 _id로 고유값찾기



router.get('/:id', async (req, res) => {
  const { id } = req.params;
console.log("3333333333333333333333333333")
  try {
    const findBoard = await board.findOne({ _id: new ObjectId(id) });
    res.status(200).json({ success: true, data: findBoard });
  } catch (error) {
    res.status(400).json({ success: false, message: error.name + ": " + error.message });
  }
});


// export default async (req, res) => {
//   const {
//       query: { id },
//       method
//   } = req;

//   switch (method) {
//       case 'GET':
//           try {
//               const findBoard = await findBoard.findOne({ _id: new ObjectId(id) });
//               res.status(200).json({ success: true, data: findId });
//           } catch (error) {
//               res.status(400).json({ success: false, message: error.name + ": " + error.message });
//           }
//           break;
      // case 'PUT':
      //     try {
      //         const updateNotice = await NoticeApp.findByIdAndUpdate(id, req.body, {
      //             new: true,
      //             runValidators: true,
      //         });
      //         if (!updateNotice) {
      //             res.status(200).json({ success: false, message: '공지사항 수정 실패' });
      //             break;
      //         }
      //         res.status(200).json({ success: true, data: updateNotice });
      //     } catch (error) {
      //         console.log(error)
      //         return res.status(400).json({ success: false, message: error.name + ": " + error.message });
      //     }
      //     break;
      // case 'DELETE':
      //     try {
      //         const checkNotice = await NoticeApp.findOne({ _id: new ObjectId(id) });
      //         if (!checkNotice) {
      //             res.status(200).json({ success: false, message: '존재하지않는 공지사항입니다.' });
      //             break;
      //         }
      //         const deleteNotice = await NoticeApp.deleteOne({ _id: new ObjectId(id) });
      //         if (!deleteNotice) {
      //             res.status(200).json({ success: false, message: '공지사항 삭제 실패' });
      //             break;
      //         }
      //         res.status(201).json({ success: true });
      //     } catch (error) {
      //         console.log(error)
      //         res.status(400).json({ success: false, message: error.name + ": " + error.message });
      //     }
      //     break;
//       default:
//           res.status(400).json({ success: false, message: error.name + ": " + error.message });
//           break;
//   }
// };




module.exports = router;
