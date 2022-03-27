using Microsoft.AspNetCore.Mvc;
using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EugenS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BullsAndCowsController : ControllerBase
    {
        private static readonly string[] _arr = new[] { "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" };

        private static Func<string, bool> CompareStrings(string otherString, int bulls, int cows)
        {
            var symbols = otherString.ToCharArray().Select((x, i) => new { ch = x, pos = i }).ToDictionary(x => x.ch, x => x.pos);
            return it => it.Select((x, i) => new { ch = x, pos = i }).Count(x => symbols.Keys.Contains(x.ch) && symbols[x.ch] != x.pos) == cows
            && it.Select((x, i) => new { ch = x, pos = i }).Count(x => symbols.Keys.Contains(x.ch) && symbols[x.ch] == x.pos) == bulls;
        }

        /// <summary>
        /// Получить возмозжные решения
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return GetSessionValues();
        }

        /// <summary>
        /// Задать значение
        /// </summary>
        /// <param name="value">Значение</param>
        /// <param name="bulls">Количество быков</param>
        /// <param name="cows">Количество коров</param>
        [HttpPost]
        public void Post(string value, int bulls, int cows)
        {
            var res = GetSessionValues();
            res = res.Where(CompareStrings(value, bulls, cows));
            SetSessionValues(res);
        }

        [HttpDelete]
        public void Delete()
        {
            HttpContext.Session.Clear();
        }

        /// <summary>
        /// Создать стартовый массив всехвозможных значений
        /// </summary>
        /// <returns></returns>
        private static IEnumerable<string> CreateStartArray()
        {
            var res = new List<string>();
            for (int i = 0; i < _arr.Length; i++)
            {
                res.AddRange(GetAllPossiblesCombinations(i));
            }
            return res;
        }

        /// <summary>
        /// Вспомогательный метод для создания массива стартовых значений
        /// </summary>
        /// <param name="startPos">Индекс первого элемента в возвращаемой строке</param>
        /// <param name="len">недостающее количество символов</param>
        /// <param name="usedIndexes">использованные элементы</param>
        /// <returns>массив всех возможных элементов</returns>
        private static List<string> GetAllPossiblesCombinations(int startPos, int len = 4, List<int> usedIndexes = null)
        {
            if (len == 1)
            {
                usedIndexes.Remove(startPos);
                return new List<string>() { _arr[startPos] };
            }

            var res = new List<string>();
            usedIndexes ??= new List<int>();
            usedIndexes.Add(startPos);
            var necessaryIndexes = Enumerable.Range(0, _arr.Length).Where(it => !usedIndexes.Contains(it));
            var s = _arr[startPos];
            foreach (var index in necessaryIndexes)
            {
                usedIndexes.Add(index);
                var result = GetAllPossiblesCombinations(index, len - 1, usedIndexes);
                usedIndexes.Remove(index);
                res.AddRange(result.Select(it => s + it));
            }
            usedIndexes.Remove(startPos);
            return res;
        }

        private IEnumerable<string> GetSessionValues()
        {
            HttpContext.Session.TryGetValue("result", out var res);
            if (res != null)
            {
                var s = Encoding.ASCII.GetString(res);
                return s.Split(",");
            }
            else
            {
                var result = CreateStartArray();
                SetSessionValues(result);
                return result;
            }
        }

        private void SetSessionValues(IEnumerable<string> values)
        {
            var s = string.Join(",", values);
            HttpContext.Session.Set("result", Encoding.ASCII.GetBytes(s));
        }
    }
}
