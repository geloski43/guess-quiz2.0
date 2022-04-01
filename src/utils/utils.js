const second = 1;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const month = day * 30;
const year = month * 12;

export const formatTemplate = (template, dict, ...rest) => {
  if (!template) {
    return ['(invalid template)'];
  }
  let tmplValues = dict;
  // If the 2nd argument isn't a dictionary, then we will gather arguments 1 => end into an object.
  // I'm arbitrarily making argument 0 the template.
  if (dict instanceof Object === false) {
    tmplValues = Object.assign({}, [dict].concat(rest));
  }

  const pattern = /(\{[^}]+\})/g;
  let result = template.split(pattern);
  for (let i = 0; i < result.length; i += 1) {
    if (result[i].match(pattern) && result[i].slice(1, -1) in tmplValues) {
      result[i] = tmplValues[result[i].slice(1, -1)];
    }
  }
  result = result.filter(part => part !== '');
  return result;
};

export const formatTemplateToString = (template, dict, ...rest) =>
  formatTemplate(template, dict, ...rest).join('');

export function fromNow(time) {
  const units = [
    {
      name: 'a second',
      plural: '{0} seconds',
      limit: minute,
      in_seconds: second,
    },
    {
      name: 'a minute',
      plural: '{0} minutes',
      limit: hour,
      in_seconds: minute,
    },
    {
      name: 'an hour',
      plural: '{0} hours',
      limit: day,
      in_seconds: hour,
    },
    {
      name: 'a day',
      plural: '{0} days',
      limit: month,
      in_seconds: day,
    },
    {
      name: 'a month',
      plural: '{0} months',
      limit: year,
      in_seconds: month,
    },
    {
      name: 'a year',
      plural: '{0} years',
      limit: null,
      in_seconds: year,
    },
  ];

  const diff = (new Date() - new Date(time * 1000)) / 1000;

  if (diff < 5) {
    return 'just now';
  }

  for (let i = 0; i < units.length; i += 1) {
    const unit = units[i];

    if (diff < unit.limit || !unit.limit) {
      const val = Math.floor(diff / unit.in_seconds);
      return formatTemplateToString(
        '{0} ago',
        val > 1 ? formatTemplateToString(unit.plural, val) : unit.name
      );
    }
  }

  return '';
}

export const decodeQuestion = html => {
  var txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

export const decodeHtml = html => {
  var txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .split('');
};

export function* shuffle(array) {
  var i = array.length;

  while (i--) {
    yield array.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
  }
}
