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
		public IDbSet<Participant> Participants { get; set; } 
		public IDbSet<ClassicStory> ClassicStories { get; set; } 
		public IDbSet<EnhancedStory> EnhancedStories { get; set; } 

	}
}