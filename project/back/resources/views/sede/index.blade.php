@extends('layouts.app')

@section('template_title')
    Sede
@endsection

@section('content')
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12">
                <div class="card">
                    <div class="card-header">
                        <div style="display: flex; justify-content: space-between; align-items: center;">

                            <span id="card_title">
                                {{ __('Sede') }}
                            </span>

                             <div class="float-right">
                                <a href="{{ route('sedes.create') }}" class="btn btn-primary btn-sm float-right"  data-placement="left">
                                  {{ __('Create New') }}
                                </a>
                              </div>
                        </div>
                    </div>
                    @if ($message = Session::get('success'))
                        <div class="alert alert-success">
                            <p>{{ $message }}</p>
                        </div>
                    @endif

                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-striped table-hover">
                                <thead class="thead">
                                    <tr>
                                        <th>No</th>
                                        
										<th>Name</th>
										<th>Created By</th>
										<th>Modified By</th>

                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($sedes as $sede)
                                        <tr>
                                            <td>{{ ++$i }}</td>
                                            
											<td>{{ $sede->name }}</td>
											<td>{{ $sede->created_by }}</td>
											<td>{{ $sede->modified_by }}</td>

                                            <td>
                                                <form action="{{ route('sedes.destroy',$sede->id) }}" method="POST">
                                                    <a class="btn btn-sm btn-primary " href="{{ route('sedes.show',$sede->id) }}"><i class="fa fa-fw fa-eye"></i> {{ __('Show') }}</a>
                                                    <a class="btn btn-sm btn-success" href="{{ route('sedes.edit',$sede->id) }}"><i class="fa fa-fw fa-edit"></i> {{ __('Edit') }}</a>
                                                    @csrf
                                                    @method('DELETE')
                                                    <button type="submit" class="btn btn-danger btn-sm"><i class="fa fa-fw fa-trash"></i> {{ __('Delete') }}</button>
                                                </form>
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {!! $sedes->links() !!}
            </div>
        </div>
    </div>
@endsection
