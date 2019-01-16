//https://segmentfault.com/a/1190000017814119?utm_source=weekly&utm_medium=email&utm_campaign=email_weekly
/*
����һ��

ʵ�ַ�ʽ�ǣ�ѡ��һ���м������Ϊ��׼�㣬����������ֱ�ȥ����Ȼ�׼��С��ֵ���ͱȻ�׼�����ֵ�����ݹ���ߵ�������ұߵ����飬��concatȥ��һ������ĺϲ���

������δ���ķ�����
ȱ�㣺

��ȡ��׼��ʹ����һ��splice��������js��splice����������һ�ο����Ĳ����������������¸��Ӷ�ΪO(n)����O(n)��������������ģ�Ĵ�С������һ��ѭ��������
��������ÿ��ִ�ж���ʹ�õ���������ռ䣬�����ռ临�Ӷȡ�
concat��������������һ�ο����������ĸ��Ӷ�Ҳ����O(n)
�Դ������ݵ�������˵��Ի�Ƚ���
�ŵ㣺

��������ˣ��ɶ���ǿ���������
�ǳ��ʺ��������Ա�����
*/
var quickSort = function(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  var pivotIndex = Math.floor(arr.length / 2);
  var pivot = arr.splice(pivotIndex, 1)[0];
  var left = [];
  var right = [];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat([pivot], quickSort(right));
};


/*
��������

��һ��ָ��iȥ����һ���ָ�

��ʼ��i = -1
ѭ�����飬�ҵ���֧��С�����ͽ�i�����ƶ�һ��λ�ã�ͬʱ���±�i����λ��
ѭ�����������֧����i+1λ�õ�Ԫ�ؽ��н���λ��
������ǻ�õ�һ����iָ����Ϊ�ֽ�㣬�ָ�ɴ��±�0-i���� i+1�����һ��Ԫ�ء�
*/
function swap(A, i, j) {
  const t = A[i];
  A[i] = A[j];
  A[j] = t;
}

/**
 *
 * @param {*} A  ����
 * @param {*} p  ��ʼ�±�
 * @param {*} r  �����±� + 1
 */
function divide(A, p, r) {
  const x = A[r - 1];
  let i = p - 1;

  for (let j = p; j < r - 1; j++) {
    if (A[j] <= x) {
      i++;
      swap(A, i, j);
    }
  }

  swap(A, i + 1, r - 1);

  return i + 1;
}

/**
 * 
 * @param {*} A  ����
 * @param {*} p  ��ʼ�±�
 * @param {*} r  �����±� + 1
 */
function qsort(A, p = 0, r) {
  r = r || A.length;

  if (p < r - 1) {
    const q = divide(A, p, r);
    qsort(A, p, q);
    qsort(A, q + 1, r);
  }

  return A;
}