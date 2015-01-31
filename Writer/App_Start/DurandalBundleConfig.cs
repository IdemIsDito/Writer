using System;
using System.Web.Optimization;

namespace Writer
{
	public class DurandalBundleConfig
	{
		public static void RegisterBundles(BundleCollection bundles)
		{
			bundles.IgnoreList.Clear();
			AddDefaultIgnorePatterns(bundles.IgnoreList);

			bundles.Add(
				new StyleBundle("~/Content/css")
					.Include("~/Content/animate.css")
					.Include("~/Content/bootstrap.css")
					.Include("~/Content/durandal.css")
					.Include("~/Content/toastr.css")
					.Include("~/Content/app.css")
				);
			bundles.Add(
				new ScriptBundle("~/Scripts/js")
					.Include("~/Scripts/jquery-{version}.js")
					.Include("~/Scripts/knockout-{version}.js")
					.Include("~/Scripts/bootstrap.js")
					.Include("~/Scripts/toastr.js")
				);
		}

		public static void AddDefaultIgnorePatterns(IgnoreList ignoreList)
		{
			if (ignoreList == null)
			{
				throw new ArgumentNullException("ignoreList");
			}

			ignoreList.Ignore("*.intellisense.js");
			ignoreList.Ignore("*-vsdoc.js");
			ignoreList.Ignore("*.debug.js", OptimizationMode.WhenEnabled);
//			ignoreList.Ignore("*.min.js", OptimizationMode.WhenDisabled);
//			ignoreList.Ignore("*.min.css", OptimizationMode.WhenDisabled);
		}
	}
}