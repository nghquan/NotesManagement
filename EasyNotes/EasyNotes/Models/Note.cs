using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyNotes.Models
{
    public class Note
    {
        public string noteDetails { get; set; }

        public DateTime? modificationDate { get; set; }

        public int id { get; set; }
    }
}
