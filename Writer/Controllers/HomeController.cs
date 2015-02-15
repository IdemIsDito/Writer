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

		private string AssignParticipant()
		{
			var random = new Random();

			var storyTypes = new List<string>
			{
				"Classic",
				"Enhanced"
			};

			var classicCount =
				_context.Context.Participants
					.Count(x => x.ActivityType == "Classic");

			var enhancedCount =
				_context.Context.Participants
					.Count(x => x.ActivityType == "Enhanced");

			var storyType =
				classicCount == enhancedCount
					? storyTypes.OrderBy(x => random.Next()).First()
					: classicCount > enhancedCount
						? "Enhanced"
						: "Classic";

			var participant = new Participant
			{
				Guid = Guid.NewGuid(),
				ActivityType = storyType,
			};
			_context.Context.Participants.Add(participant);
			_context.Context.SaveChanges();
			return participant.Guid.ToString();
		}

		private string GetSiteRoot()
		{
			var siteRoot = HttpContext.Request.ApplicationPath ?? "";
			if (siteRoot.EndsWith("/"))
			{
				siteRoot = siteRoot.Substring(0, siteRoot.Length - 1);
			}
			return siteRoot;
		}

		public RedirectResult Index()
		{
			var guid = AssignParticipant();
			var siteRoot = GetSiteRoot();
			return Redirect(siteRoot + "/" + guid + "/");
		}

		public ActionResult ReturningParticipant(string guid,
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
			var parsedGuid = Guid.Parse(guid);
			var entryCompleted = _context.Context.Participants.Count(p => p.Guid == parsedGuid && p.Completed);
			var siteRoot = GetSiteRoot();
			if (entryCompleted > 0)
			{
				ViewBag.SiteRoot = siteRoot;
				return View("Completed");
			}

			var config = new Config
			{
				siteRoot = siteRoot,
				returnURL = siteRoot + "/" + guid + "/",
				breezeRoot = siteRoot + "/breeze/",
				imageRoot = siteRoot + "/Content/images/",
				appJs = siteRoot + "/App/main",
				scriptCache = scriptCache,
				debug = debug,
				participantGuid = guid
			};

			ViewBag.SiteConfig = config;

			return View("Index");
		}
	}

	public class Config
	{
		// ReSharper disable InconsistentNaming
		public string siteRoot { get; set; }
		public string returnURL { get; set; }
		public string breezeRoot { get; set; }
		public string imageRoot { get; set; }
		public string appJs { get; set; }
		public bool scriptCache { get; set; }
		public bool debug { get; set; }
		public string participantGuid { get; set; }
		// ReSharper restore InconsistentNaming
	}
}