using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace Writer.Models
{
	public class Participant
	{
		[Key, DataMember]
		public int Id { get; set; }

		[DataMember]
		public Guid Guid { get; set; }

		[DataMember]
		public string StoryType { get; set; } //ClassicStories or EnhancedStories

//		[DataMember]
//		public int StoryId { get; set; }

		[DataMember]
		public int? Age { get; set; }

		[DataMember]
		public string Gender { get; set; }

		[DataMember]
		public string Nationality { get; set; }

		[DataMember]
		public string EducationCompleted { get; set; }

		[DataMember]
		public string EmploymentStatus { get; set; }

		[DataMember]
		public string SimaExperience { get; set; }
	}
}