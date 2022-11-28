<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;
    
    require 'phpmailer/PHPMailer.php';
    require 'phpmailer/SMTP.php';
    require 'phpmailer/Exception.php';

    
    $mail = new PHPMailer(true);
    try{


        //Server settings
        $mail->SMTPDebug = SMTP::DEBUG_SERVER;                     
        $mail->isSMTP();                                          
        $mail->Host       = 'ssl://smtp.mail.ru';                     
        $mail->SMTPAuth   = true;                                   
        $mail->Username   = 'genby1995.test@mail.ru';                     
        $mail->Password   = '1efad1YChCirbgD9Wgi3';                                           
        $mail->Port       = 465;
        $mail->SMTPKeepAlive = true;

        //Recipients
        $mail -> setFrom('genby1995.test@mail.ru', 'Магазин мячей');
        if (trim(!empty($_POST['email']))){
            $mail -> addAddress($_POST['email']);
        } else{
            $mail -> addAddress('genby1995.test@mail.ru');
        }
        

        //Content
        $mail -> isHTML(true);
        $mail->CharSet = "UTF-8";
        $mail -> setLanguage('ru', '');
        $mail -> Subject = "Поступил новый заказ на сайте 'Магазин мячей'";

        //Тело письмо
        $body = "<h1 style='font-size:16px;font-weight:600;color:blue;line-height: 16px;'>Поступил новый заказ на сайте 'Магазин мячей'<h1> <hr>";
        
        
        if (trim(!empty($_POST['name']))){
            $body.='<p style="font-size:12px;font-weight:600;line-height:16px;">Информация о заказчике:</p><p style="font-size:12px;font-weight:400;line-height:16px;"><strong>Имя:<strong> '.$_POST['name'].'</p>';
        }
        if (trim(!empty($_POST['phone']))){
            $body.='<p style="font-size:12px;font-weight:400;line-height:16px;"><strong>Телефон:<strong> '.$_POST['phone'].'</p>';
        }
        if (trim(!empty($_POST['prod']))){
            $body.='<p style="font-size:12px;font-weight:400;line-height:16px;"><strong>Товар:<strong> '.$_POST['prod'].'</p>';
        }
        if (trim(!empty($_POST['comm']))){
            $body.='<p style="font-size:12px;font-weight:400;line-height:16px;"><strong>Комментарий:<strong> '.$_POST['comm'].'</p>';
        }
        

        $mail -> Body = $body;

        $mail->send();
        echo 'Message has been sent';
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
?>