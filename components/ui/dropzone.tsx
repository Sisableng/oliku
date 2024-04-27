'use client';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import React, { FC } from 'react';
import {
  Accept,
  FileRejection,
  FileWithPath,
  useDropzone,
} from 'react-dropzone';
import { toast } from 'sonner';

interface DropzoneProps {
  onDrop: (acceptedFiles: FileWithPath[]) => void;

  /**
   * Accepted file types with examples.
   *
   * @example
   * {
   *   'image/*': ['.jpeg', '.png'],
   *   'text/html': ['.html', '.htm'],
   * }
   */
  acceptedFileTypes?: Accept;
  maxFileSize?: number;
  maxFiles?: number;
  className?: string;
}

export default function Dropzone({
  onDrop,
  acceptedFileTypes,
  maxFileSize = 1048576,
  maxFiles,
  className,
}: DropzoneProps) {
  const onDropCallback = React.useCallback(
    (acceptedFiles: FileWithPath[], rejectedFiles: FileRejection[]) => {
      if (rejectedFiles.length > 0) {
        const firstRejection = rejectedFiles[0];
        const { file, errors } = firstRejection;

        const maxFileSizeMB = maxFileSize
          ? (maxFileSize / (1024 * 1024)).toFixed()
          : null;

        if (errors.some((error) => error.code === 'too-many-files')) {
          toast.error(`Maximum number of files is ${maxFiles} files.`);
        } else if (errors.some((error) => error.code === 'file-too-large')) {
          // Show error toast with the validation message
          toast.error(
            `File '${file.name}', is too large${
              maxFileSizeMB ? ` (Maximum file size: ${maxFileSizeMB} MB)` : ''
            }`
          );
        }
      } else {
        onDrop(acceptedFiles);
      }
    },
    [onDrop]
  );

  const {
    fileRejections,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop: onDropCallback,
    accept: acceptedFileTypes,
    maxSize: maxFileSize,
    maxFiles: maxFiles,
  });
  return (
    <div>
      <div
        className={cn(
          'flex h-60 max-h-60 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed p-2 text-center text-xs transition-colors ease-in-out',
          isDragActive
            ? 'border-green-500'
            : fileRejections.length > 0
              ? 'border-destructive'
              : 'border-foreground-200 hover:border-primary',
          className
        )}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className='px-10'>Drop here ...</p>
        ) : (
          <p className='px-10'>Drag or click to select files</p>
        )}
      </div>
    </div>
  );
}
