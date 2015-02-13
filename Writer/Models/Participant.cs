using System;
using System.Runtime.Serialization;

namespace Writer.Models
{
	public class Participant : AppEntity
	{
		[DataMember]
		public Guid Guid { get; set; }

		[DataMember]
		public string ActivityType { get; set; } //ClassicActivity or EnhancedActivity

		[DataMember]
		public int? Age { get; set; }

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

		[DataMember]
		public int? InstructionClear { get; set; }
		
		[DataMember]
		public int? InstructionEffective { get; set; }
		
		[DataMember]
		public int? FeedbackClear { get; set; }

		[DataMember]
		public int? FeedbackEffective { get; set; }

		[DataMember]
		public int? GoodActivity { get; set; }

		[DataMember]
		public bool Completed { get; set; }
	}
}