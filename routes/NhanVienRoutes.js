var bodyParser = require("body-parser");
const NhanVienModel = require("../models/NhanVienModels");
const router = require("express").Router();
var bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", async (req, res) => {
  const data = await NhanVienModel.find().lean();
  res.render("home", { data });
});

router.get("/add", async (req, res) => {
  res.render("add");
});

router.post("/add", async (req, res) => {
  try {
    const maNV = req.body.maNV;
    const tenNV = req.body.tenNV;
    const diemTB = req.body.diemTB;
    if (diemTB < 0) {
      console.log("so duong");
      res.render("add", {
        diemTBError: "điểm phải lớn hơn 0"
      });
    } else {
      const newNhanVien = new NhanVienModel({ maNV, tenNV, diemTB });
      await newNhanVien.save();
      res.redirect("/");
    }
    // res.status(200).json(newNhanVien);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/edit/:id", async (req, res) => {
  const id = req.params.id;
  NhanVienModel.findById(id)
    .then(data => {
      res.render("edit", { data });
    })
    .catch(error => {
      console.error(error);
      res.status(500).send("Internal server error");
    });
});

router.post("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const { maNV, tenNV, diemTB } = req.body;
  NhanVienModel.findByIdAndUpdate(id, { maNV, tenNV, diemTB })
    .then(() => {
      res.redirect("/");
    })
    .catch(error => {
      console.error(error);
      res.status(500).send("Internal server error");
    });
});

router.post("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await NhanVienModel.findByIdAndDelete(id);
  res.redirect("/");
});

module.exports = router;
