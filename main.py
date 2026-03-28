import sys
import kernel0d as zd

import fcntl, os

## for logging during debug
# log_path = os.path.join(os.environ.get('PBPWD', '.'), 'pbplog.txt')

# def pbplog(msg):
#     with open(log_path, 'a') as f:
#         f.write(msg + '\n')

try:

    [palette, env] = zd.initialize_from_files (sys.argv[3:])
    top = zd.start (arg=sys.argv[1], part_name=sys.argv[2], palette=palette, env=env)



except Exception as e:
    # this stuff makes the exception output less verbose
    #  in general we don't expect to get any exceptions, here, but,
    # bugs and typos happen when humans write code
    _, _, tb = sys.exc_info()
    while tb.tb_next:
        tb = tb.tb_next
    frame = tb.tb_frame
    filename = frame.f_code.co_filename
    line_number = tb.tb_lineno
    print(f"\n\n\n*** {type(e).__name__} at {filename}:{line_number}: {e}", file=sys.stderr)
    
