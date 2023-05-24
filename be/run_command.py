import logging
import os
import subprocess

logging.basicConfig(level=logging.INFO)


def run_command(command):
    full_command = [
        "steamcmd",
        "+@NoPromptForPassword 1",
        "+@sSteamCmdForcePlatformType windows",
        f"+login {os.environ['STEAM_USERNAME']} {os.environ['STEAM_PASSWORD']}",
    ]
    full_command.extend(command)
    full_command.append("+quit")

    p = subprocess.Popen(full_command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    while True:
        stdout = p.stdout.readline().decode().strip()
        stderr = p.stderr.readline().decode().strip()
        if stdout:
            logging.info(stdout)
        if stderr:
            logging.error(stderr)
        if not stdout and not stderr and p.poll() is not None:
            break
