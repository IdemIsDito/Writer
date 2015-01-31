using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Breeze.ContextProvider.EF6;
using Writer.Models;

namespace Writer.Controllers
{
	public class HomeController : Controller
	{
		private readonly EFContextProvider<WriterContext> _context = new EFContextProvider<WriterContext>();

		private Participant CreateParticipant()
		{
			var random = new Random();

			var storyTypes = new List<string>
			{
				"ClassicStories",
				"EnhancedStories"
			};

			var classicCount =
				_context.Context.Participants
					.Count(x => x.StoryType == "ClassicStories");

			var enhancedCount =
				_context.Context.Participants
					.Count(x => x.StoryType == "EnhancedStories");

			var storyType =
				classicCount == enhancedCount
					? storyTypes.OrderBy(x => random.Next()).First()
					: classicCount > enhancedCount
						? "EnhancedStories"
						: "ClassicStories";

			var participant =
				new Participant
				{
					Guid = Guid.NewGuid(),
					StoryType = storyType
				};

			_context.Context.Participants.Add(participant);
			_context.Context.SaveChanges();

			return participant;
		}

		public ActionResult Index(
#if DEBUG
			bool scriptCache = false
#else
			bool scriptCache = true
#endif
			,
#if DEBUG
			bool debug = true
#else
			bool debug = false
#endif
			)
		{
			var siteRoot = HttpContext.Request.ApplicationPath ?? "";

			if (siteRoot.EndsWith("/"))
			{
				siteRoot = siteRoot.Substring(0, siteRoot.Length - 1);
			}

			var config =
				new Config
				{
					siteRoot = siteRoot,
					breezeRoot = siteRoot + "/breeze/",
					imageRoot = siteRoot + "/Content/images/",
					appJs = siteRoot + "/App/main",
					scriptCache = scriptCache,
					debug = debug,
					participant = CreateParticipant()
				};

			ViewBag.SiteConfig = config;

			return View();
		}
	}

	public class Config
	{
		// ReSharper disable InconsistentNaming
		public string siteRoot { get; set; }
		public string breezeRoot { get; set; }
		public string imageRoot { get; set; }
		public string appJs { get; set; }
		public bool scriptCache { get; set; }
		public bool debug { get; set; }
		public Participant participant { get; set; }
		// ReSharper restore InconsistentNaming
	}
}