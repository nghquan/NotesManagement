using EasyNotes.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace EasyNotes.Controllers
{
    public class NoteController : Controller
    {
        public NoteController() {
        }

        [HttpGet]
        public ActionResult GetAll()
        {
            IEnumerable<Note> notes = new List<Note>()
            {
                new Note(){ id = 1,noteDetails="Note details 1",modificationDate=DateTime.Now},
                new Note(){ id = 2,noteDetails="Note details 2",modificationDate=DateTime.Now},
                new Note(){ id = 3,noteDetails="Note details 3",modificationDate=DateTime.Now},
            };
            return Json(notes, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult Get(int id) {
            return Json(new Note() { id = id, noteDetails = "Note details 1", modificationDate = DateTime.Now }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult Post(Note note)
        {
            return Json(new Note() { id = 1, noteDetails = "Note details 1", modificationDate = DateTime.Now }, JsonRequestBehavior.AllowGet);
        }

        [HttpPut]
        public ActionResult Put(Note note)
        {
            return Json(new Note() { id = 1, noteDetails = "Note details 1", modificationDate = DateTime.Now }, JsonRequestBehavior.AllowGet);
        }

        [HttpDelete]
        public ActionResult Delete(int id) {
            return Json(true, JsonRequestBehavior.AllowGet);
        }
    }
}
