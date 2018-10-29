<?php
require_once 'utils/utils.mail.php';

if (!empty($_POST['name']) && !empty($_POST['email']) && !empty($_POST['message'])) {
    $_POST['name'] = htmlspecialchars($_POST['name']);
    $_POST['email'] = htmlspecialchars($_POST['email']);
    $_POST['message'] = htmlspecialchars($_POST['message']);
    $message = "Имя: $_POST[name]<br>Email: $_POST[email]<br>Сообщение: $_POST[message]";

    send_mail("info@infomedia.digital", "Форма обратной связи", $message);

    echo "Success";
}