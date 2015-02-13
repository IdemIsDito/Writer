using System;
using System.Collections.Generic;
using System.Data.Entity;

namespace Writer.Models
{
	public class Initializer : DropCreateDatabaseIfModelChanges<WriterContext>
	{
		protected override void Seed(WriterContext context)
		{
			var stories = new List<ClassicActivity>
			{
				new ClassicActivity { Id = 1, Summary = "Vivamus feugiat commodo volutpat. Sed sed velit libero. Sed enim magna, commodo ac volutpat quis, sodales non orci. Quisque eget urna magna. Maecenas sollicitudin mauris odio, id pretium dui aliquet eget. Donec hendrerit dui in tellus ornare, quis rhoncus diam condimentum. Donec commodo lorem in elit aliquam dapibus."}
			};
			stories.ForEach(s => context.ClassicActivities.Add(s));
			context.SaveChanges();
		}
	}
}