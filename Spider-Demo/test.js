const a_tag_pattern = /<a[^>]+?href=["']?([^"']+)["']?[^>]*>((<img(.*?)(src)="(?!.*?logo)[^<]*>)|([^>]+))<\/a>/g;
var text = "asdasd<a href=\"http://car.auto.ifeng.com/brand/20066/\" class=\"kw-link\" target=\"_blank\">宝马</a>asdasd";
console.log(text.match(a_tag_pattern)[0]);