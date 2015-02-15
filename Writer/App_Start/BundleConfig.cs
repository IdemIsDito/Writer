using System.Web.Optimization;

namespace Writer
{
	public class BundleConfig
	{
		public static void RegisterBundles(BundleCollection bundles)
		{
			bundles.Add(
				new StyleBundle("~/Content/css")
					.Include("~/Content/animate.css")
					.Include("~/Content/bootstrap.css")
					.Include("~/Content/durandal.css")
					.Include("~/Content/toastr.css")
					.Include("~/Content/ladda-themeless.css")
					.Include("~/Content/app.css")
				);
			bundles.Add(
				new ScriptBundle("~/Scripts/js")
					.Include("~/Scripts/jquery-{version}.js")
					.Include("~/Scripts/knockout-{version}.js")
					.Include("~/Scripts/knockout.validation.js")
					.Include("~/Scripts/bootstrap.js")
					.Include("~/Scripts/toastr.js")
					.Include("~/Scripts/spin.js")
					.Include("~/Scripts/ladda.js")
				);

#if !DEBUG
			BundleTable.EnableOptimizations = true;
#endif
		}
	}
}