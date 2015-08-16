using EasyNotes.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EasyNotes.Controllers
{
    public class HomeController : Controller
    {
        [HttpPost]
        public ActionResult GetAll()
        {
            IEnumerable<Note> notes = new List<Note>()
            {
                new Note(){ id = 1,noteDetails="Note details 1",modificationDate=DateTime.Now},
                new Note(){ id = 1,noteDetails="Note details 1",modificationDate=DateTime.Now},
                new Note(){ id = 1,noteDetails="Note details 1",modificationDate=DateTime.Now},
            };

            return Json(notes, JsonRequestBehavior.AllowGet);
        }
        
        public ActionResult Index() {            
            return new FilePathResult(HttpContext.Server.MapPath("~/Views/index.html"), "text/html");
        }
    }
}