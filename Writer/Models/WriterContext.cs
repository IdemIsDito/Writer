using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using Writer.Models;

namespace Writer.Models
{
	public class WriterContext : DbContext
	{
		public WriterContext() : base("WriterContext")
		{
		}

		public IDbSet<Story> Stories { get; set; } 

	}
}