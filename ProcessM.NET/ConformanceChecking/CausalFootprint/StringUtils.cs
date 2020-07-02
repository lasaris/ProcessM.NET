using System;
using System.Collections.Generic;
using System.Text;

namespace ProcessM.NET.ConformanceChecking.CausalFootprint
{
    /// <summary>
    /// A utility class containing methods for string manipulation for the needs of CausalFootprint comparison analysis, 
    /// such as incrementing and extracting global IDs from strings.
    /// </summary>
    static class StringUtils
    {
        public static bool IsNumber(char c)
        {
            return (c > 47 && c < 59);
        }

        public static bool IsCapitalLetter(char c)
        {
            return (c > 64 && c < 91);
        }

        public static bool IsNonCapitalLetter(char c)
        {
            return (c > 96 && c < 123);
        }

        public static bool IsLetter(char c)
        {
            return IsCapitalLetter(c) || IsNonCapitalLetter(c);
        }

        private static bool IsStringEmptyOrNull(string str)
        {
            return str == null || str == "";
        }

        /// <summary>
        /// Checks whether given string contains only given char.
        /// </summary>
        /// <param name="str">String to be checked.</param>
        /// <param name="c">Char to be looked for.</param>
        /// <returns>True if given string contains only given char, else returns false.</returns>
        private static bool ContainsOnly(string str, char c)
        {
            int i = 0;
            while (i < str.Length && str[i] == c)
            {
                i++;
            }
            return i == str.Length;
        }

        /// <summary>
        /// Increments given letter ID.
        /// </summary>
        /// <param name="oldId">Letter ID to be incremented.</param>
        /// <param name="isCapital">Boolean value whether given ID is capital or not.</param>
        /// <returns>New letter ID.</returns>
        private static string IncrementLetterId(string oldId, bool isCapital)
        {
            char lowerBound = 'a';
            char upperBound = 'z';
            if (isCapital)
            {
                lowerBound = 'A';
                upperBound = 'Z';
            }

            bool needsExtension = ContainsOnly(oldId, upperBound);
            if (needsExtension)
            {
                StringBuilder newId = new StringBuilder("");
                for (int i = 0; i <= oldId.Length; i++)
                {
                    newId.Append(lowerBound);
                }
                return newId.ToString();
            }

            char[] oldIdArray = oldId.ToCharArray();
            char formerChar = oldIdArray[oldId.Length - 1];
            oldIdArray[oldId.Length - 1] = ++formerChar;
            if (oldIdArray[oldId.Length - 1] == upperBound + 1)
            {
                for (int i = oldId.Length - 1; i <= 0; i--)
                {
                    if (oldIdArray[i] == upperBound + 1)
                    {
                        oldIdArray[i - 1]++;
                        oldIdArray[i] = lowerBound;
                    } else
                    {
                        return oldIdArray.ToString();
                    }
                }
            }
            string newString = new string(oldIdArray);
            return newString;
        }


        /// <summary>
        /// Increments given ID.
        /// </summary>
        /// <param name="oldId">ID to be incremented.</param>
        /// <returns>New ID.</returns>
        public static string IncrementId(string oldId)
        {
            if (IsStringEmptyOrNull(oldId))
            {
                throw new ArgumentException("Old ID cannot be empty or null.");
            }
            if (IsCapitalLetter(oldId[0]))
            {
                return IncrementLetterId(oldId, /*isCapital*/ true);
            }
            if (IsNonCapitalLetter(oldId[0]))
            {
                return IncrementLetterId(oldId, /*isCapital*/ false);
            }
            return "" + (int.Parse(oldId) + 1);
        }

        /// <summary>
        /// Finds global ID in given level.
        /// </summary>
        /// <param name="level">Level to be examined.</param>
        /// <returns>String with global ID of given level.</returns>
        public static string GetGlobalId(string level)
        {
            if (IsStringEmptyOrNull(level))
            {
                throw new ArgumentException("Level cannot be empty or null.");
            }
            int i = 0;
            string gid = "";
            while (IsNumber(level[i]))
            {
                gid += level[i];
                i++;
            }
            return gid;
        }
    }
}
