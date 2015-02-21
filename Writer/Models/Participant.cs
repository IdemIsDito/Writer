using System;
using System.Runtime.Serialization;

namespace Writer.Models
{
	public class Participant : AppEntity
	{
		[DataMember]
		public Guid Guid { get; set; }

		[DataMember] //ClassicActivity or EnhancedActivity;
		public string ActivityType { get; set; }

		[DataMember]
		public int? Age { get; set; }

		[DataMember]
		public string Email { get; set; }

		[DataMember]
		public string Gender { get; set; }

		[DataMember]
		public string MotherLanguageDutch { get; set; }

		[DataMember]
		public string EducationCompleted { get; set; }

		[DataMember]
		public string EducationCompletedDifferent { get; set; }

		[DataMember]
		public string SimaExperience { get; set; }

		[DataMember] //1 = Volledig oneens; 2 = Oneens; 3 = Neutraal; 4 = Eens; 5 = Volledig eens;
		public int? InstructionClear { get; set; }

		[DataMember] //1 = Volledig oneens; 2 = Oneens; 3 = Neutraal; 4 = Eens; 5 = Volledig eens;
		public int? InstructionEffective { get; set; }

		[DataMember] //1 = Volledig oneens; 2 = Oneens; 3 = Neutraal; 4 = Eens; 5 = Volledig eens;
		public int? FeedbackClear { get; set; }

		[DataMember] //1 = Volledig oneens; 2 = Oneens; 3 = Neutraal; 4 = Eens; 5 = Volledig eens;
		public int? FeedbackEffective { get; set; }

		[DataMember] //1 = Volledig oneens; 2 = Oneens; 3 = Neutraal; 4 = Eens; 5 = Volledig eens;
		public int? GoodActivity { get; set; }

		[DataMember]
		public string Remarks { get; set; }

		[DataMember]
		public bool Completed { get; set; }
	}
}