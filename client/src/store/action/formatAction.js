export const formatIDR = d => {
  var bilangan = d;

  var reverse = bilangan
      .toString()
      .split("")
      .reverse()
      .join(""),
    ribuan = reverse.match(/\d{1,3}/g);
  ribuan = ribuan
    .join(".")
    .split("")
    .reverse()
    .join("");
  return ribuan;
};

export const formatTotal = data => {
  const total = [];
  data.forEach(d => {
    total.push(d.total);
  });

  return total.length !== 0
    ? total.reduce((total, num) => {
        return total + num;
      })
    : 0;
};
