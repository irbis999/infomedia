<?php
//SMTP needs accurate times, and the PHP time zone MUST be set
//This should be done in your php.ini, but this is how to do it if you don't have access to that
date_default_timezone_set('Etc/UTC');

require 'PHPMailer/PHPMailerAutoload.php';

$PHPMailerInstance = new PHPMailer;
$PHPMailerInstance->isSMTP();
$PHPMailerInstance->SMTPDebug = 0;
$PHPMailerInstance->Debugoutput = 'html';

$PHPMailerInstance->isHTML(true);
$PHPMailerInstance->CharSet = "utf-8";

$PHPMailerInstance->Host = 'smtp.yandex.ru';
$PHPMailerInstance->Port = 465;
$PHPMailerInstance->SMTPSecure = 'ssl';
$PHPMailerInstance->SMTPAuth = true;

$PHPMailerInstance->Username = "infomedia.digital@yandex.ru";
$PHPMailerInstance->Password = "Grenel999";
$PHPMailerInstance->setFrom('infomedia.digital@yandex.ru', 'Infomedia');

function send_mail($email, $subject, $message)
{
    global $PHPMailerInstance;
    $PHPMailerInstance->clearAddresses();
    $PHPMailerInstance->addAddress($email);
    $PHPMailerInstance->Subject = $subject;
    $PHPMailerInstance->msgHTML($message);
    if (!$PHPMailerInstance->send()) {
        echo "Mailer Error: " . $PHPMailerInstance->ErrorInfo;
    }
    $PHPMailerInstance->clearAddresses();
}

//Тест
//send_mail("alexey.tihonenko@me.com", "Отпракка из php", "Отправка из php - тело");
