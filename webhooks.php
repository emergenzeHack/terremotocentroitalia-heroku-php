<?php
	// Siamo in emergenza: andiamo di polling.
	exit(0);

	define('GITHUB_REPO', 'https://' . getenv('GITHUB_USERNAME') . ':' . getenv('GITHUB_PASSWORD') . '@github.com/emergenzeHack/terremotocentro');
	define('GITLAB_REPO', 'https://' . getenv('GITLAB_AUTH') . '@gitlab.com/emergenzeHack/terremotocentro');

	function is_empty_dir($dir) {
		return (($files = @scandir($dir)) && count($files) <= 2);
	}

	function exec_log($cmd) {
		exec($cmd, $out, $ret);
		error_log(join('\n', $out));
		return !$ret;
	}

	function cleanup($type) {
		rmdir("/tmp/terremotocentro.lock.$type");
	}

	$token = getenv('WEBHOOKS_TOKEN');
	$type = $_GET['type'];
//	if (!$token || $_GET['token'] != $token || ($type != 'csv' && $type != 'sync')) { FIXME
	if (!$token || $_GET['token'] != $token || ($type != 'sync' && $type != 'issue')) {
		exit;
	}
	ob_start();
	var_dump($_POST);
	error_log(ob_get_contents());
	ob_end_clean();

	$git_dir="/tmp/terremotocentro.$type";

	$i = 0;
	// Poor man™ locking (funziona solo se hai un worker, come nel caso di Heroku free)
	$id = $_SERVER['HTTP_X_REQUEST_ID'];
	while (!@mkdir("/tmp/terremotocentro.lock.$type")) {
		sleep(1);
		$i++;
		if ($i && ($i % 5) == 0)
			error_log("$type ($id): Locked for $i seconds");
#		if ($i >= 600) {
#			error_log("$type ($id): Stale lock detected after $i seconds.");
#			rmdir("/tmp/terremotocentro.lock.$type");
#		}
	}
	register_shutdown_function('cleanup', $type);

	if (is_dir($git_dir) && !is_empty_dir($git_dir)) {
		chdir($git_dir);
		exec_log('git fetch origin master && git reset --hard origin/master');
	} else {
		exec_log('git clone ' . GITHUB_REPO . " $git_dir");
		chdir($git_dir);
		exec_log('git config user.name terremotocentro && git config user.email terremotocentroita@gmail.com');
	}
	// Scarico le pagine da Google Spreadsheet e le converto in CSV
	if ($type == 'csv') {
		exec_log('bash scripts/csvupdate.sh');
	// Scarico le issue da GitHub e le converto in CSV
	} elseif ($type == 'issue') {
		exec_log('python2 scripts/github2CSV.py _data/issues.csv _data/issuesjson.json _data/issues.geojson && sed -i \'s/\r$//g\' _data/issues.csv') or exit(0);
		exec_log('git add _data/issues.csv _data/issuesjson.json _data/issues.geojson');
		exec_log('git commit -m "auto issues CSV update ' . date('c') . '"');
		exec_log('git push origin master');
	// Sincronizzo GitLab con GitHub
	} elseif ($type == 'sync') {
		chdir($git_dir);
		exec_log('git push ' . GITLAB_REPO . ' master:master');
	}
?>
