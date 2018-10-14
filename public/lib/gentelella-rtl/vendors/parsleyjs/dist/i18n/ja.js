// Validation errors messages for Parsley
// Load this after Parsley

Parsley.addMessages('ja', {
  defaultMessage: "無効な値です。",
  type: {
<<<<<<< HEAD
    email:        "有効なメールアドレスを入力してください。",
    url:          "有効なURLを入力してください。",
    number:       "数値を入力してください。",
    integer:      "整数を入力してください。",
    digits:       "数字を入力してください。",
    alphanum:     "英数字を入力してください。"
=======
    email:        "正しいメールアドレスを入力してください。",
    url:          "正しいURLを入力してください。",
    number:       "正しい数字を入力してください。",
    integer:      "正しい数値を入力してください。",
    digits:       "正しい桁数で入力してください。",
    alphanum:     "正しい英数字を入力してください。"
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
  },
  notblank:       "この値を入力してください",
  required:       "この値は必須です。",
  pattern:        "この値は無効です。",
  min:            "%s 以上の値にしてください。",
  max:            "%s 以下の値にしてください。",
  range:          "%s から %s の値にしてください。",
  minlength:      "%s 文字以上で入力してください。",
  maxlength:      "%s 文字以下で入力してください。",
  length:         "%s から %s 文字の間で入力してください。",
  mincheck:       "%s 個以上選択してください。",
  maxcheck:       "%s 個以下選択してください。",
  check:          "%s から %s 個選択してください。",
  equalto:        "値が違います。"
});

Parsley.setLocale('ja');
