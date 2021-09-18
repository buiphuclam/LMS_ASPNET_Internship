using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LMS_G03.Common
{
    //public enum UserRoles
    //{
    //    SystemAdmin,
    //    ClassAdmin,
    //    Teacher,
    //    MentorTA,
    //    Instructor,
    //    Student
    //}
    public static class UserRoles
    {
        public const string SystemAdmin = "SystemAdmin"; //5
        public const string ClassAdmin = "ClassAdmin"; //4
        public const string Teacher = "Teacher"; //3
        public const string MentorTA = "MentorTA"; //2
        public const string Instructor = "Instructor"; //1
        public const string Student = "Student"; //0
    }
}
