<?php

$content = file_get_contents('/etc/openvpn/openvpn-status.log');
$lines = explode("\n", $content);
$clients = array();
$start1 = false;
$start2 = false;

foreach ($lines as $key => $line) {
    $split = explode(',', $line);
    if (strpos($line, 'Common Name,Real Address,Bytes Received,Bytes Sent,Connected Since') !== false) {
        $start1 = true;
    } else if (strpos($line, 'ROUTING TABLE') !== false) {
        $start1 = false;
    } else if (strpos($line, 'Virtual Address,Common Name,Real Address,Last Ref') !== false) {
        $start2 = true;
    } else if (strpos($line, 'GLOBAL STATS') !== false) {
        $start2 = false;
    } else if ($start1) {
        $clients[$split[0]]['name'] = $split[0];
        $clients[$split[0]]['ipReal'] = $split[1];
        $clients[$split[0]]['bytesReceived'] = $split[2];
        $clients[$split[0]]['bytesSent'] = $split[3];
        $clients[$split[0]]['connectedSince'] = (new DateTime($split[4]))->format("Y-m-d\TH:i:sO");
    } else if ($start2) {
        $clients[$split[1]]['ipVirtual'] = $split[0];
        $clients[$split[1]]['lastRefresh'] = (new DateTime($split[3]))->format("Y-m-d\TH:i:sO");
    }
}

if ($_GET['json'] == 'true') {
    echo json_encode(array_values($clients));
    exit(0);
}

?>
<!doctype html>
<html>
<head>
    <meta charset="utf-8"/>
    <title>MCHS VPN</title>
</head>
<body>

<table>
    <?php
    if (count($clients) > 0) {
        echo "<thead><tr>";
        foreach (array_values($clients)[0] as $key => $value) {
            echo "<td><strong>";
            echo $key;
            echo "</strong></td>";
        }
        echo "</tr></thead>";
        foreach ($clients as $name => $client) {
            echo "<tr>";
            foreach ($client as $key => $value) {
                echo "<td>";
                if (strpos($key, 'bytes') !== false) {
                    $suffix = "";
                    if ($value > 1024) {
                        $value = $value / 1024.0;
                        $suffix = "k";
                        if ($value > 1024) {
                            $value = $value / 1024.0;
                            $suffix = "M";
                        }
                    }
                    echo number_format($value, 2, '.', ' ') . $suffix;
                } else {
                    echo $value;
                }
                echo "</td>";
            }
            echo "</tr>";
        }
    }
    ?>
</table>

</body>
</html>