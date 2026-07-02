const LANGUAGE_DATA = {
  "c": {
    "keywords": [
      "auto", "break", "case", "char", "const", "continue", "default", "do", "double", "else", 
      "enum", "extern", "float", "for", "goto", "if", "inline", "int", "long", "register", 
      "restrict", "return", "short", "signed", "sizeof", "static", "struct", "switch", "typedef", 
      "union", "unsigned", "void", "volatile", "while", "_Bool", "_Complex", "_Imaginary"
    ],
    "preprocessor": [
      "include", "define", "undef", "ifdef", "ifndef", "endif", "elif", "error", "pragma"
    ],
    "types_and_constants": [
      "size_t", "NULL", "FILE", "EOF", "bool", "true", "false", "uint8_t", "uint16_t", "uint32_t", 
      "uint64_t", "int8_t", "int16_t", "int32_t", "int64_t", "va_list", "errno", "stdin", "stdout", 
      "stderr", "time_t", "clock_t", "tm"
    ],
    "stdio_functions": [
      "printf", "scanf", "fprintf", "fscanf", "sprintf", "sscanf", "putchar", "getchar", "puts", 
      "gets", "fopen", "fclose", "fread", "fwrite", "fseek", "ftell", "rewind", "fgetpos", 
      "fsetpos", "feof", "ferror", "clearerr", "remove", "rename", "tmpfile", "fflush", "setbuf", 
      "fgetc", "fgets", "fputc", "fputs"
    ],
    "stdlib_functions": [
      "malloc", "calloc", "realloc", "free", "exit", "abort", "atexit", "getenv", "system", "abs", 
      "labs", "div", "ldiv", "rand", "srand", "qsort", "bsearch", "atoi", "atol", "atof", 
      "strtol", "strtod"
    ],
    "string_functions": [
      "strlen", "strcpy", "strncpy", "strcat", "strncat", "strcmp", "strncmp", "strchr", "strrchr", 
      "strstr", "strspn", "strcspn", "strpbrk", "strtok", "memset", "memcpy", "memmove", 
      "memcmp", "memchr"
    ],
    "math_functions": [
      "sqrt", "pow", "exp", "log", "log10", "sin", "cos", "tan", "asin", "acos", "atan", "atan2", 
      "sinh", "cosh", "tanh", "ceil", "floor", "fabs", "fmod", "round"
    ],
    "other_functions": [
      "time", "clock", "difftime", "mktime", "asctime", "ctime", "strftime", "isalnum", "isalpha", 
      "iscntrl", "isdigit", "isgraph", "isprint", "ispunct", "isspace", "islower", "isupper", 
      "isxdigit", "tolower", "toupper", "assert", "main"
    ]
  },
  "pascal": {
    "keywords": [
      "and", "array", "as", "asm", "begin", "case", "class", "const", "constructor", "destructor", 
      "div", "do", "downto", "else", "end", "except", "exports", "file", "finalization", "finally", 
      "for", "function", "goto", "if", "implementation", "in", "inherited", "initialization", 
      "inline", "interface", "is", "label", "library", "mod", "nil", "not", "object", "of", "on", 
      "operator", "or", "packed", "procedure", "program", "property", "raise", "record", "repeat", 
      "resourcestring", "self", "set", "shl", "shr", "then", "threadvar", "to", "try", "type", 
      "unit", "until", "uses", "var", "while", "with", "xor", "out"
    ],
    "directives": [
      "absolute", "abstract", "alias", "assembler", "cdecl", "default", "deprecated", "export", 
      "external", "forward", "generic", "helper", "local", "near", "far", "overload", "override", 
      "pascal", "private", "protected", "public", "published", "register", "safecall", "specialize", 
      "stdcall", "virtual"
    ],
    "types": [
      "integer", "real", "boolean", "char", "string", "text", "textfile", "byte", "word", 
      "cardinal", "shortint", "smallint", "longint", "int64", "single", "double", "extended", 
      "comp", "currency", "pointer", "variant", "ansistring", "widestring", "unicodestring"
    ],
    "constants": [
      "true", "false", "maxint"
    ],
    "io_routines": [
      "writeln", "readln", "write", "read", "assign", "close", "reset", "rewrite", "append", 
      "assignfile", "closefile", "flush", "eof", "eoln", "seek", "filesize", "filepos"
    ],
    "math_routines": [
      "abs", "sqr", "sqrt", "sin", "cos", "arctan", "ln", "exp", "round", "trunc", "int", "frac"
    ],
    "system_routines": [
      "inc", "dec", "succ", "pred", "ord", "chr", "odd", "random", "randomize", "halt", "exit",
      "length", "concat", "copy", "delete", "insert", "pos", "val", "str", "upcase", "lowercase",
      "new", "dispose", "getmem", "freemem", "assigned", "addr", "sizeof", "high", "low",
      "paramcount", "paramstr"
    ]
  },
  "java": {
    "keywords": [
      "abstract", "assert", "boolean", "break", "byte", "case", "catch", "char", "class", "const", 
      "continue", "default", "do", "double", "else", "enum", "extends", "final", "finally", "float", 
      "for", "goto", "if", "implements", "import", "instanceof", "int", "interface", "long", 
      "native", "new", "package", "private", "protected", "public", "return", "short", "static", 
      "strictfp", "super", "switch", "synchronized", "this", "throw", "throws", "transient", "try", 
      "void", "volatile", "while", "true", "false", "null", "exports", "module", "requires", "var", 
      "yield", "record", "sealed", "non-sealed", "permits"
    ],
    "core_classes": [
      "String", "Object", "System", "Class", "Math", "Integer", "Double", "Float", "Long", "Boolean", 
      "Character", "Byte", "Short", "Void", "StringBuilder", "StringBuffer", "Thread", "Runnable", 
      "Throwable", "Exception", "RuntimeException", "Error", "StackTraceElement", "Process", "Runtime"
    ],
    "collections_classes": [
      "List", "ArrayList", "LinkedList", "Map", "HashMap", "TreeMap", "Set", "HashSet", "TreeSet", 
      "Queue", "Deque", "Stack", "Vector", "Hashtable", "Properties", "Collections", "Arrays", 
      "Scanner", "Random", "UUID", "Optional", "Objects", "Iterator", "ListIterator", "Stream", 
      "Collectors", "Date", "Calendar", "GregorianCalendar", "Locale", "Currency"
    ],
    "io_classes": [
      "File", "InputStream", "OutputStream", "FileInputStream", "FileOutputStream", "Reader", 
      "Writer", "BufferedReader", "BufferedWriter", "InputStreamReader", "OutputStreamWriter", 
      "PrintWriter", "PrintStream", "Serializable", "Path", "Paths", "Files"
    ],
    "common_methods": [
      "main", "out", "err", "in", "print", "println", "printf", "format", "equals", "hashCode", 
      "toString", "clone", "finalize", "wait", "notify", "notifyAll", "length", "charAt", 
      "substring", "indexOf", "lastIndexOf", "split", "replace", "replaceAll", "toLowerCase", 
      "toUpperCase", "trim", "strip", "concat", "contains", "startsWith", "endsWith", "isEmpty", 
      "size", "add", "get", "set", "remove", "clear", "containsKey", "containsValue", "keySet", 
      "values", "entrySet", "put", "putAll", "parseInt", "parseDouble", "valueOf", "compare", 
      "compareTo", "stream", "filter", "map", "reduce", "forEach", "collect", "of", "builder", 
      "build", "next", "hasNext", "nextInt", "nextLine"
    ]
  },
  "python": {
    "keywords": [
      "False", "None", "True", "and", "as", "assert", "async", "await", "break", "class", 
      "continue", "def", "del", "elif", "else", "except", "finally", "for", "from", "global", 
      "if", "import", "in", "is", "lambda", "nonlocal", "not", "or", "pass", "raise", "return", 
      "try", "while", "with", "yield"
    ],
    "builtins": [
      "abs", "all", "any", "ascii", "bin", "bool", "breakpoint", "bytearray", "bytes", "callable", 
      "chr", "classmethod", "compile", "complex", "delattr", "dict", "dir", "divmod", "enumerate", 
      "eval", "exec", "filter", "float", "format", "frozenset", "getattr", "globals", "hasattr", 
      "hash", "help", "hex", "id", "input", "int", "isinstance", "issubclass", "iter", "len", 
      "list", "locals", "map", "max", "memoryview", "min", "next", "object", "oct", "open", 
      "ord", "pow", "print", "property", "range", "repr", "reversed", "round", "set", "setattr", 
      "slice", "sorted", "staticmethod", "str", "sum", "super", "tuple", "type", "vars", "zip"
    ],
    "exceptions": [
      "Exception", "TypeError", "ValueError", "KeyError", "IndexError", "AttributeError", 
      "NameError", "StopIteration", "GeneratorExit", "KeyboardInterrupt", "SystemExit", 
      "ImportError", "ModuleNotFoundError", "ZeroDivisionError", "FileNotFoundError", 
      "RuntimeError", "NotImplementedError", "AssertionError", "SyntaxError", "IndentationError"
    ],
    "methods": [
      "append", "extend", "insert", "remove", "pop", "clear", "index", "count", "sort", "reverse", 
      "copy", "keys", "values", "items", "get", "update", "setdefault", "popitem", "add", "discard", 
      "union", "intersection", "difference", "symmetric_difference", "issubset", "issuperset", 
      "split", "join", "replace", "find", "rfind", "strip", "lstrip", "rstrip", "lower", "upper", 
      "title", "capitalize", "startswith", "endswith", "isalpha", "isdigit", "isalnum", "isspace", 
      "format_map", "read", "readline", "readlines", "write", "writelines", "close", "seek", 
      "tell", "flush"
    ],
    "modules": [
      "os", "sys", "math", "json", "random", "datetime", "re", "time", "collections", "itertools", 
      "functools", "pathlib", "subprocess", "urllib", "hashlib", "socket", "threading", 
      "multiprocessing"
    ],
    "module_functions": [
      "argv", "exit", "environ", "path", "getcwd", "listdir", "mkdir", "makedirs", "rename", 
      "exists", "splittext", "basename", "dirname", "floor", "ceil", "sqrt", "sin", "cos", 
      "tan", "log", "log10", "exp", "pi", "e", "dumps", "loads", "dump", "load", "randint", 
      "choice", "shuffle", "sample", "now", "date", "timedelta", "strftime", "strptime", "match", 
      "search", "findall", "sub", "sleep", "Counter", "defaultdict", "deque", "namedtuple"
    ]
  },
  "js": {
    "keywords": [
      "break", "case", "catch", "class", "const", "continue", "debugger", "default", "delete", 
      "do", "else", "export", "extends", "finally", "for", "function", "if", "import", "in", 
      "instanceof", "new", "return", "super", "switch", "this", "throw", "try", "typeof", "var", 
      "void", "while", "with", "yield", "let", "static", "await", "async"
    ],
    "globals_and_builtins": [
      "true", "false", "null", "undefined", "NaN", "Infinity", "globalThis", "window", "document", 
      "console", "process", "module", "exports", "require", "Object", "Function", "Boolean", 
      "Symbol", "Error", "EvalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", 
      "URIError", "Number", "BigInt", "Math", "Date", "String", "RegExp", "Array", "Int8Array", 
      "Uint8Array", "Uint8ClampedArray", "Int16Array", "Uint16Array", "Int32Array", "Uint32Array", 
      "Float32Array", "Float64Array", "BigInt64Array", "BigUint64Array", "Map", "Set", "WeakMap", 
      "WeakSet", "ArrayBuffer", "SharedArrayBuffer", "DataView", "JSON", "Promise", "Generator", 
      "GeneratorFunction", "AsyncFunction", "Reflect", "Proxy", "Intl"
    ],
    "prototype_methods": [
      "toString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", 
      "keys", "values", "entries", "assign", "create", "defineProperty", "freeze", "seal",
      "length", "push", "pop", "shift", "unshift", "concat", "join", "slice", "splice", "indexOf", 
      "lastIndexOf", "forEach", "map", "filter", "reduce", "reduceRight", "every", "some", "find", 
      "findIndex", "fill", "copyWithin", "sort", "reverse", "flat", "flatMap", "includes",
      "charAt", "charCodeAt", "codePointAt", "substring", "substr", "split", "replace", "replaceAll", 
      "match", "matchAll", "search", "toLowerCase", "toUpperCase", "trim", "trimStart", "trimEnd", 
      "repeat", "padStart", "padEnd", "startsWith", "endsWith"
    ],
    "global_functions": [
      "eval", "isFinite", "isNaN", "parseFloat", "parseInt", "encodeURI", "encodeURIComponent", 
      "decodeURI", "decodeURIComponent", "setTimeout", "setInterval", "clearTimeout", 
      "clearInterval", "fetch", "alert", "prompt", "confirm"
    ],
    "dom_browser_apis": [
      "addEventListener", "removeEventListener", "querySelector", "querySelectorAll", 
      "getElementById", "getElementsByClassName", "getElementsByTagName", "createElement", 
      "appendChild", "removeChild", "replaceChild", "setAttribute", "getAttribute", 
      "removeAttribute", "classList", "style", "innerHTML", "textContent", "innerText", "value", 
      "localStorage", "sessionStorage", "XMLHttpRequest", "WebSocket", "Response", "Request", 
      "Headers", "Event", "CustomEvent"
    ]
  },
  "shell": {
    "keywords": [
      "if", "then", "elif", "else", "fi", "case", "esac", "for", "while", "until", "do", "done", 
      "in", "function", "select", "coproc", "time"
    ],
    "variables": [
      "PATH", "HOME", "USER", "SHELL", "PWD", "OLDPWD", "LANG", "IFS", "PS1", "UID", "RANDOM", 
      "SECONDS", "BASH", "BASH_VERSION", "OSTYPE", "HOSTNAME"
    ],
    "builtins": [
      "alias", "bg", "bind", "break", "builtin", "caller", "cd", "command", "compgen", "complete", 
      "compopt", "continue", "declare", "dirs", "disown", "echo", "enable", "eval", "exec", "exit", 
      "export", "fc", "fg", "getopts", "hash", "help", "history", "jobs", "kill", "let", "local", 
      "logout", "mapfile", "popd", "printf", "pushd", "pwd", "read", "readarray", "readonly", 
      "return", "set", "shift", "shopt", "source", "suspend", "test", "times", "trap", "type", 
      "typeset", "ulimit", "umask", "unalias", "unset", "wait"
    ],
    "utilities": [
      "ls", "cat", "cp", "mv", "rm", "mkdir", "rmdir", "touch", "chmod", "chown", "grep", "egrep", 
      "fgrep", "awk", "sed", "find", "xargs", "tar", "gzip", "gunzip", "zip", "unzip", "zcat", 
      "wc", "head", "tail", "less", "more", "sort", "uniq", "cut", "paste", "tr", "diff", "patch", 
      "tee", "date", "cal", "uname", "hostname", "whoami", "id", "groups", "env", "printenv", 
      "which", "whereis", "df", "du", "free", "top", "htop", "ps", "killall", "pkill", "pgrep", 
      "sleep", "clear", "man", "sudo", "su", "chroot", "ln", "file", "stat", "basename", 
      "dirname", "expr", "bc", "seq", "curl", "wget", "ssh", "scp", "rsync", "ping", "ifconfig", 
      "ip", "netstat", "ss", "nc", "telnet", "host", "dig", "nslookup", "make", "gcc", "git"
    ]
  },
  "sql": {
    "clauses_and_keywords": [
      "select", "from", "where", "group", "by", "having", "order", "asc", "desc", "limit", "offset",
      "and", "or", "not", "in", "like", "between", "exists", "is", "null", "union", "all", 
      "intersect", "except", "minus", "any", "some", "as", "escape", "collate", "end"
    ],
    "dml": [
      "insert", "into", "values", "update", "set", "delete", "truncate", "merge", "call", "explain"
    ],
    "ddl": [
      "create", "table", "database", "schema", "view", "index", "trigger", "procedure", "function", 
      "drop", "alter", "add", "column", "constraint", "rename"
    ],
    "tcl_dcl": [
      "grant", "revoke", "commit", "rollback", "savepoint", "transaction", "begin", "work"
    ],
    "joins": [
      "join", "inner", "left", "right", "outer", "full", "cross", "natural", "on", "using"
    ],
    "window_functions": [
      "row_number", "rank", "dense_rank", "lead", "lag", "first_value", "last_value", "nth_value", 
      "ntile", "cume_dist", "percent_rank", "partition", "over", "rows", "range", "groups", 
      "preceding", "following", "unbounded", "current", "row"
    ],
    "aggregate_functions": [
      "count", "sum", "avg", "min", "max", "distinct"
    ],
    "types": [
      "int", "integer", "tinyint", "smallint", "bigint", "numeric", "decimal", "float", "double", 
      "real", "char", "varchar", "text", "nchar", "nvarchar", "binary", "varbinary", "blob", "clob", 
      "boolean", "date", "time", "datetime", "timestamp", "interval", "json", "uuid", "xml"
    ],
    "scalar_functions": [
      "coalesce", "nullif", "cast", "convert", "concat", "substring", "substr", "length", "len", 
      "lower", "upper", "trim", "ltrim", "rtrim", "replace", "round", "floor", "ceil", "abs", 
      "now", "current_date", "current_time", "current_timestamp", "extract", "date_add", 
      "date_sub", "datediff", "case", "when", "then", "else", "md5", "sha1", "sha256", 
      "uuid_generate_v4"
    ],
    "constraints": [
      "primary", "foreign", "key", "references", "unique", "check", "default", "cascade", 
      "restrict", "identity", "auto_increment", "generated", "always", "stored"
    ]
  }
};